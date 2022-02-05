import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBill } from "../../store/bills";



const EditBillForm = ({ showModal, bill }) => {
	const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user)

    const expenses = bill.expenses;
    const payers = []
    expenses.forEach(expense => {
        if (expense.payer_name !== sessionUser.username) {
            payers.push(expense.payer_name)
        }
    })

	const [errors, setErrors] = useState([]);
	const [total_amount, setTotal_Amount] = useState(bill.total_amount);
	const [description, setDescription] = useState(bill.description);
    const [deadline, setDeadline] = useState(bill.deadline)
    const [friends, setFriends] = useState(payers.join(", "))


	const handleSubmit = async (e) => {
		e.preventDefault();

        const data = await dispatch(editBill(bill.id, sessionUser.id, total_amount, description, deadline, friends))

		if (data) {
			setErrors(data);
            console.log("ERRORS!!", errors)
            return
		}

        showModal(false)
	};

	const updateTotal = (e) => {
		setTotal_Amount(e.target.value);
	};

	const updateDescription = (e) => {
		setDescription(e.target.value);
	};

    const updateDeadline = (e) => {
		setDeadline(e.target.value);
	};

    const updateFriends = (e) => {
        setFriends(e.target.value)
    }


	return (
		<form onSubmit={handleSubmit}>
			{/* <div>
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div> */}
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
			<div>
				<label htmlFor="description">Description</label>
				<input
					name="description"
					type="text"
					placeholder="Bill Description"
					value={description}
					onChange={updateDescription}
				/>
			</div>
            <div>
				<label htmlFor="deadline">Deadline</label>
				<input
					name="deadline"
					type="date"
					value={deadline}
					onChange={updateDeadline}
				/>
			</div>
            <div>
                <label htmlFor="friends">Between Who?</label>
                <input
                    name="friends"
                    type="text"
                    value={friends}
                    placeholder="Usernames of friends separated by commas."
                    onChange={updateFriends}
                />
            </div>
			<button type="submit">Edit Bill</button>
		</form>
	);
};

export default EditBillForm;
