import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addTransactionRecord, getUserBalance } from "../../../../../../../store/bills";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()



const SettleUpForm = ({ showModal, expense }) => {
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user)

	const [errors, setErrors] = useState({});
	const [amount_paid, setAmountPaid] = useState(expense.amount_due);

	const notify = () => {
		toast.success(`You paid $${amount_paid}!`,
			{
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 2000
			})
	}


	const handleSubmit = async (e) => {
		e.preventDefault();

		if (Object.keys(errors).length === 0) {
			const data = await dispatch(addTransactionRecord(expense.bill.owner_id, expense.id, amount_paid))
			dispatch(getUserBalance(sessionUser.id))
			notify()

			showModal(false)

			if (data) {
				setErrors(data);
				return
			}
		}


	};

	useEffect(() => {
		const errors = [];
		if (amount_paid > Number(expense.amount_due)) errors["amount_paid"] = `You can't pay more than what's due!`
		if (amount_paid <= 0) errors["amount_paid"] = "Please enter a positive value."
		if (amount_paid.split(".").length > 1) {
			if (amount_paid.split(".")[1].length > 2) errors["amount_paid"] = "Please round to the nearest cent."
		}
		setErrors(errors);

	}, [amount_paid, expense.amount_due])

	const updateAmountPaid = (e) => {
		setAmountPaid(e.target.value);
	};

	const handleCancel = (e) => {
		e.preventDefault();
		showModal(false);
	};

	return (
		<form className='settle-up-form-container' onSubmit={handleSubmit}>
			<button
				className="close-modal"
				onClick={() => showModal(false)}
			>
				<i className="fas fa-minus"></i>
			</button>
			<div className='duck-gif-container'>
			</div>
			<div className='dollar-sign-and-input settle-up-input-container'>
				<div className='payment-input-container'>
					<label htmlFor="amount_paid" className='dollar-sign settle-up-dollar-sign'>$</label>
					<input
						name="amount_paid"
						type="number"
						step="0.01"
						placeholder="0"
						value={amount_paid}
						onChange={updateAmountPaid}
						id='settle-up-input'
					/>
					<div className='errors-container'>
						{errors.amount_paid ? `${errors.amount_paid}` : ""}
					</div>
				</div>
				<div className='su-btn-container'>
					<button
						className='settle-up-submit-btn'
						type="submit">
						<p className='testing-ellipses'>{`Pay ${expense.bill.owner_name} for ${expense.bill.description}`}</p>
					</button>
					<button onClick={handleCancel}
						className='form-cancel-btn'
						id='settle-up-cancel'>Cancel</button>
				</div>
			</div>
		</form>
	);
};

export default SettleUpForm;
