import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransactionRecord } from "../../../store/transactionrecords";


const SettleUpForm = ({ showModal, expense }) => {
	const dispatch = useDispatch();

	const [errors, setErrors] = useState([]);
	const [amount_paid, setAmountPaid] = useState(expense.amount_due);


	const handleSubmit = async (e) => {
		e.preventDefault();

        const data = await dispatch(addTransactionRecord(expense.bill.owner_id, expense.id, amount_paid))

        if (data) {
			setErrors(data);
            return
		}

        showModal(false)
	};

	const updateAmountPaid = (e) => {
		setAmountPaid(e.target.value);
	};


	return (
		<form onSubmit={handleSubmit}>
			<div>
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<div>
				<label htmlFor="amount_paid">Pay</label>
				<input
					name="amount_paid"
					type="number"
                    step="0.01"
					placeholder="0"
					value={amount_paid}
					onChange={updateAmountPaid}
				/>
			</div>
			<button type="submit">Settle Up</button>
		</form>
	);
};

export default SettleUpForm;
