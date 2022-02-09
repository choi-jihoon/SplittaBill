import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createBill, getUserBalance } from "../../store/bills";


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

	const [errors, setErrors] = useState({});
	const [isEmpty, setIsEmpty] = useState(true)
	const [total_amount, setTotal_Amount] = useState("");
	const [description, setDescription] = useState("");
	const [deadline, setDeadline] = useState(todayString)
	const [friends, setFriends] = useState([])

	const notify = () => {
		toast(`Bill for ${description} added!`,
			{
				position: toast.POSITION.TOP_CENTER,
				autoClose: 2000
			})
	}


	const handleSubmit = async (e) => {
		e.preventDefault();
		const friendsString = friends.join(", ")
		const data = await dispatch(createBill(sessionUser.id, total_amount, description, deadline, friendsString))
		dispatch(getUserBalance(sessionUser.id));

		if (data) {
			const dataArr = data[0].split(': ');
			errors['deadline'] = dataArr[1];
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

		if (description.length > 36) errors['description'] = "Description must be less than 36 characters."
		if (total_amount <= 0) errors['total_amount'] = "Please provide a positive value for the total amount."

		setErrors(errors);
	}, [description, total_amount])

	useEffect(() => {
		const notEmpty = [];
		if (!total_amount) notEmpty.push('total amount is empty');
		if (!description) notEmpty.push('description is empty');
		setIsEmpty((notEmpty.length > 0))
	}, [total_amount, description])


	const updateTotal = (e) => {
		setTotal_Amount(e.target.value);
	};

	const updateDescription = (e) => {
		setDescription(e.target.value);
	};

	const updateDeadline = (e) => {
		setDeadline(e.target.value);
		delete errors.deadline;
	};

	const updateFriends = (e) => {
		const currFriends = friends.slice();
		if (!currFriends.includes(e.target.value)) currFriends.push(e.target.value);
		else if (currFriends.includes(e.target.value)) currFriends.splice(currFriends.indexOf(e.target.value), 1);
		setFriends((prev) => prev = currFriends);
	}


	return (
		<form className='form-container bill-form' onSubmit={handleSubmit}>
			{/* <div className='errors-container'>
				{errors.map((error, ind) => (
					<div className='error-msg' key={ind}>{error}</div>
				))}
			</div> */}
			<h3 className='create-a-bill'>Create a Bill</h3>
			<button
				className="close-modal"
				onClick={() => showModal(false)}
			>
				<i className="fas fa-minus"></i>
			</button>
			<div className='form-input-container'>
				<div className='form-element'>
					<label className='form-label' htmlFor="total_amount">Total Bill</label>
					<div className='dollar-sign-and-input'>
						<p className='dollar-sign'>$</p>
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
					<div className='errors-container'>
						{errors.total_amount ? `${errors.total_amount}` : ""}
					</div>
				</div>
				<div className='form-element'>
					<label className='form-label' htmlFor="description">Description</label>
					<input
						className='form-input'
						name="description"
						type="text"
						placeholder="What is this bill for?"
						value={description}
						onChange={updateDescription}
					/>
					<div className='errors-container'>
						{errors.description ? `${errors.description}` : ""}
					</div>
				</div>
				<div className='form-element'>
					<label className='form-label' htmlFor="deadline">Deadline</label>
					<input
						className='form-input'
						name="deadline"
						type="date"
						value={deadline}
						onChange={updateDeadline}
					/>
					<div className='errors-container'>
						{errors.deadline ? `${errors.deadline}` : ""}
					</div>
				</div>
			</div>
			<div className='form-element form-friends-list'>
				<div className='form-label form-label-friends'>
					Split with:
				</div>
				{allFriends.map(friend => {
					return (
						<div className='friend-name-checkbox-container'>
							<div className='friends-checkboxes' key={friend.id}>
								<input type="checkbox"
									id={`${friend.friend_name}Select`}
									name="friend"
									value={friend.friend_name}
									onChange={updateFriends}
								/>
							</div>
							<label className='form-friend-name' htmlFor={`${friend.friend_name}Select`}>
								{friend.friend_name}
								<div className='comment-pic-div'>
									<img src={friend.friend_image} alt={friend.friend_name} className='friend-pic' />
								</div>
							</label>
						</div>
					)
				})}
				<div className='bill-btn-container'>
					<button
						className='bill-form-submit-btn'
						disabled={isEmpty || Object.keys(errors).length > 0 || friends.length === 0}
						type="submit">Divvy Up</button>
				</div>
			</div>
		</form>
	);
};

export default AddBillForm;
