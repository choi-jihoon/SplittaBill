import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	PaymentElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";

import {
	addTransactionRecord,
	getUserBalance,
} from "../../../../../../../../store/bills";

export default function CheckoutForm({
	recipientId,
	expenseId,
	amount,
	userId,
	notify,
	showModal,
}) {
	const stripe = useStripe();
	const elements = useElements();
	const dispatch = useDispatch();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent.status) {
				case "succeeded":
					setMessage("Payment succeeded!");
					break;
				case "processing":
					setMessage("Your payment is processing.");
					break;
				case "requires_payment_method":
					setMessage(
						"Your payment was not successful, please try again."
					);
					break;
				default:
					setMessage("Something went wrong.");
					break;
			}
		});
	}, [stripe]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			// confirmParams: {
			// 	// Make sure to change this to your payment completion page
			// 	return_url: "http://localhost:3000/friends",
			// },
			redirect: "if_required",
		});

		if (!error) {
			await dispatch(addTransactionRecord(recipientId, expenseId, amount));

			await dispatch(getUserBalance(userId));

			notify();
			showModal(false);
			setIsLoading(false);
			return;
		}

		setIsLoading(false);


		// This point will only be reached if there is an immediate error when
		// confirming the payment. Otherwise, your customer will be redirected to
		// your `return_url`. For some payment methods like iDEAL, your customer will
		// be redirected to an intermediate site first to authorize the payment, then
		// redirected to the `return_url`.

		// if (error.type === "card_error" || error.type === "validation_error") {
		// 	setMessage(error.message);
		// } else {
		// 	setMessage("An unexpected error occured.");
		// }

		// setIsLoading(false);
	};

	return (
		<form id="payment-form" onSubmit={handleSubmit}>
			<PaymentElement id="payment-element" />
			<button disabled={isLoading || !stripe || !elements} id="submit">
				<span id="button-text">
					{isLoading ? (
						<div className="spinner" id="spinner"></div>
					) : (
						"Submit Payment"
					)}
				</span>
			</button>
			{/* Show any error or success messages */}
			{message && <div id="payment-message">{message}</div>}
		</form>
	);
}
