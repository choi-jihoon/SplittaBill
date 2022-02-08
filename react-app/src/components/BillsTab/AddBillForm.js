import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createBill } from "../../store/bills";

toast.configure()

const AddBillForm = ({ showModal }) => {
	const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
	const allFriendsObject = useSelector(state => state.friends.byId);
	const allFriends = Object.values(allFriendsObject);

	const today = new Date()
	const todayString = today.toISOString().split('T')[0]

	const [errors, setErrors] = useState([]);
	const [total_amount, setTotal_Amount] = useState("");
	const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState(todayString)
    const [friends, setFriends] = useState([])

	const notify = () => {
		toast(`Bill for ${description} added!`,
			{position: toast.POSITION.TOP_CENTER,
			autoClose:2000})
	}


	const handleSubmit = async (e) => {
		e.preventDefault();
		const friendsString = friends.join(", ")
        const data = await dispatch(createBill(sessionUser.id, total_amount, description, deadline, friendsString))

		if (data) {
			setErrors(data);
            return
		}

		notify()

		if (location.pathname !== "/") {
			history.push("/")
		}

        showModal(false)
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
		<form className='form-container' onSubmit={handleSubmit}>
			<div className='errors-container'>
				{errors.map((error, ind) => (
					<div className='error-msg' key={ind}>{error}</div>
				))}
			</div>
			<div className='form-input-container'>

				<div className='form-element'>
					<label className='form-label' htmlFor="total_amount">Amount</label>
					<input
						className='form-input'
						name="total_amount"
						type="number"
						step="0.01"
						placeholder="0"
						value={total_amount}
						onChange={updateTotal}
					/>
				</div>
				<div className='form-element'>
					<label className='form-label' htmlFor="description">Description</label>
					<input
						name="description"
						type="text"
						placeholder="Bill Description"
						value={description}
						onChange={updateDescription}
					/>
				</div>
				<div className='form-element'>
					<label className='form-label' htmlFor="deadline">Deadline</label>
					<input
						name="deadline"
						type="date"
						value={deadline}
						onChange={updateDeadline}
					/>
				</div>
				<button className='form-submit-btn' type="submit">Divvy Up</button>
			</div>
            <div className='form-element form-friends-list'>
				<div className='form-label'>
					Split with:
				</div>
				{allFriends.map(friend => {
					return (
						<div className='friends-checkboxes' key={friend.id}>
							<input type="checkbox"
									id="friendSelect"
									name="friend"
									value={friend.friend_name}
									onChange={updateFriends}
									 />
							<label className='form-label' htmlFor="friendSelect">
								{friend.friend_name}
							</label>
						</div>
					)
				})}
			</div>
		</form>
	);
};

export default AddBillForm;
