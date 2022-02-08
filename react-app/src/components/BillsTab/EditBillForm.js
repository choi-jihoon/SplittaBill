import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBill } from "../../store/bills";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const EditBillForm = ({ showModal, bill }) => {
	const dispatch = useDispatch();

	const sessionUser = useSelector(state => state.session.user)
	const allFriendsObject = useSelector(state => state.friends.byId);
	const allFriends = Object.values(allFriendsObject);

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
	const [friends, setFriends] = useState(payers)

	const notify = () => {
		toast.success(`Bill successfully edited!`,
			{
				position: toast.POSITION.TOP_CENTER,
				autoClose: 2000
			})
	}


	const handleSubmit = async (e) => {
		e.preventDefault();
		const friendsString = friends.join(", ")
		console.log(friendsString)
		const data = await dispatch(editBill(bill.id, sessionUser.id, total_amount, description, deadline, friendsString))

		if (data) {
			setErrors(data);
			console.log("ERRORS!!", errors)
			return
		}

		notify();

		showModal(false);
	};

	useEffect(() => {
		const errors = [];
		if (description.length > 50) errors.push("Description must be less than 50 characters.")

		setErrors(errors);
	}, [description])

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
		if (!friends.includes(e.target.value)) friends.push(e.target.value)
		else if (friends.includes(e.target.value)) friends.splice(friends.indexOf(e.target.value), 1)
        setFriends(friends)
    }


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
				{allFriends.map(friend => {
					return (
						<div className='friends-checkboxes' key={friend.id}>
							<input type="checkbox"
									id="friendSelect"
									name="friend"
									value={friend.friend_name}
									defaultChecked={payers.includes(friend.friend_name)}
									onChange={updateFriends}
									 />
							<label htmlFor="friendSelect">
								{friend.friend_name}
							</label>
						</div>
					)
				})}
			</div>
			<button type="submit">Edit Bill</button>
		</form>
	);
};

export default EditBillForm;
