import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import {
	addTransactionRecord,
	getUserBalance,
} from "../../../../../../../store/bills";
import CheckoutForm from "./CheckoutForm";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./SettleUp.css";

toast.configure();

const stripePromise = loadStripe(
	"pk_test_51KRnp0AiyFrcDvqiSLBqLIFMUw5REiFihM6eUtBZzJdrLzFDuT9a980zMaZrRzyLGBOSwZXCNKIDFHTTy8hebagK00q96aJFvQ"
);

const SettleUpForm = ({ showModal, expense }) => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);

	const [errors, setErrors] = useState({});
	const [amount_paid, setAmountPaid] = useState(expense.amount_due);
	const [showCard, setShowCard] = useState(false);
	const [showCash, setShowCash] = useState(false);
	const [clientSecret, setClientSecret] = useState("");

	const appearance = {
		theme: "stripe",
	};
	const options = {
		clientSecret,
		appearance,
	};

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		fetch("/api/stripe/create-payment-intent", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ amount: amount_paid }),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, []);

	const notify = () => {
		toast.success(`You paid $${amount_paid}!`, {
			position: toast.POSITION.TOP_RIGHT,
			autoClose: 2000,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (Object.keys(errors).length === 0) {
			const data = await dispatch(
				addTransactionRecord(
					expense.bill.owner_id,
					expense.id,
					amount_paid
				)
			);
			dispatch(getUserBalance(sessionUser.id));
			notify();

			showModal(false);

			if (data) {
				setErrors(data);
				return;
			}
		}
	};

	useEffect(() => {
		const errors = [];
		if (amount_paid > Number(expense.amount_due))
			errors["amount_paid"] = `You can't pay more than what's due!`;
		if (amount_paid <= 0)
			errors["amount_paid"] = "Please enter a positive value.";
		if (amount_paid.split(".").length > 1) {
			if (amount_paid.split(".")[1].length > 2)
				errors["amount_paid"] = "Please round to the nearest cent.";
		}
		setErrors(errors);
	}, [amount_paid, expense.amount_due]);

	useEffect(() => {
		if (showCard) {
			document
				.querySelector(".payment-modal-container")
				.classList.remove("hide-card");
			document
				.querySelector(".payment-modal-container")
				.classList.add("show-card");
			document.getElementById("back").classList.remove("clicked");
		} else {
			document
				.querySelector(".payment-modal-container")
				.classList.remove("show-card");
			setShowCard(false);
		}
	}, [showCard]);

	const backToCash = (e) => {
		e.preventDefault();

		document
			.querySelector(".payment-modal-container")
			.classList.add("hide-card");
		document.getElementById("back").classList.add("clicked");
		setShowCard(false);
	};

	const updateAmountPaid = (e) => {
		setAmountPaid(e.target.value);
	};

	const handleCancel = (e) => {
		e.preventDefault();
		showModal(false);
	};

	const handleShowCard = (e) => {
		e.preventDefault();
		setShowCard(true);
	};

	return (
		<>
			<h2 style={{ textAlign: "center", position: "absolute", top: 30 }}>
				Pay {expense.bill.owner_name}
			</h2>
			<div className="payment-modal-container">
				<div className="payment-card payment-card-first">
					<form
						className="settle-up-form-container"
						onSubmit={handleSubmit}
					>
						<button
							className="close-modal"
							onClick={() => showModal(false)}
						>
							<i className="fas fa-minus"></i>
						</button>
						<div className="duck-gif-container"></div>
						<div className="dollar-sign-and-input settle-up-input-container">
							<div className="payment-input-container">
								<label
									htmlFor="amount_paid"
									className="dollar-sign settle-up-dollar-sign"
								>
									$
								</label>
								<input
									name="amount_paid"
									type="number"
									step="0.01"
									placeholder="0"
									value={amount_paid}
									onChange={updateAmountPaid}
									id="settle-up-input"
								/>
								<div className="errors-container">
									{errors.amount_paid
										? `${errors.amount_paid}`
										: ""}
								</div>
							</div>
							<div className="su-btn-container">
								<button
									className="settle-up-submit-btn choice-btn"
									type="submit"
								>
									<p className="testing-ellipses">{`Cash Payment`}</p>
								</button>
								<button
									className="settle-up-submit-btn choice-btn card-choice"
									onClick={handleShowCard}
								>
									Pay with Card
								</button>
								<button
									onClick={handleCancel}
									className="form-cancel-btn"
									id="settle-up-cancel"
								>
									Cancel
								</button>
							</div>
						</div>
					</form>
				</div>
				<div className="payment-card payment-card-last">
					<button id="back" onClick={backToCash}>
						<i className="fas fa-arrow-left"></i>
					</button>
					<div>
						{clientSecret && (
							<Elements options={options} stripe={stripePromise}>
								<CheckoutForm
									recipientId={expense.bill.owner_id}
									expenseId={expense.id}
									amount={amount_paid}
									userId={sessionUser.id}
									notify={notify}
									showModal={showModal}
								/>
							</Elements>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default SettleUpForm;
