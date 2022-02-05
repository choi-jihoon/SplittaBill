import React, { useState } from "react";
import { useDispatch } from "react-redux";


const SettleUpForm = ({ showModal }) => {
	const dispatch = useDispatch();

	const [errors, setErrors] = useState([]);
	const [total_amount, setTotal_Amount] = useState("");


	const handleSubmit = async (e) => {
		e.preventDefault();


        showModal(false)
	};

	const updateTotal = (e) => {
		setTotal_Amount(e.target.value);
	};


	return (
		<form onSubmit={handleSubmit}>
			<div>
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<div>
				<label htmlFor="total_amount">Amount</label>
				<input
					name="total_amount"
					type="number"
                    step="0.01"
					placeholder="0"
					value={total_amount}
					onChange={updateTotal}
				/>
			</div>
			<button type="submit">Divvy Up</button>
		</form>
	);
};

export default SettleUpForm;
