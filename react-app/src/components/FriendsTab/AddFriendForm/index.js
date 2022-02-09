import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { addFriend } from "../../../store/friends";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddFriendForm.css'

toast.configure()

const AddFriendForm = ({setShowModal}) => {
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		const errors = [];
		if (username.length > 40) errors.push("Username must be less than 40 characters.")

		setErrors(errors);
	}, [username])

	const notify = () => {
		toast.success(`You added ${username} as a friend!`,
			{position: toast.POSITION.TOP_CENTER,
			autoClose:2000})
	}

	const onAddFriend = async (e) => {
		e.preventDefault();
		const data = await dispatch(addFriend(username));
		if (data && data.errors) {
			setErrors(data.errors);
		}
        else {
            setShowModal(false);
			notify()
            return <Redirect to="/friends" />;
        }
	};

	const updateUsername = (e) => {
		setUsername(e.target.value);
	};

	return (
		<form className="friend-form-container" onSubmit={onAddFriend}>
			<button
				className="close-modal"
				onClick={() => setShowModal(false)}
			>
				<i className="fas fa-minus"></i>
			</button>
			<h3>Add a Friend</h3>
			<img id="friendly-duck" src="https://cdn4.iconfinder.com/data/icons/childhood-and-toys/53/26-512.png" />

			<div className="friend-username-input-label">
				<label htmlFor="username" className="form-label">Username</label>
				<input
					name="username"
					type="text"
					placeholder="Username"
					value={username}
					onChange={updateUsername}
                    required={true}
					className="form-input"
					/>
			</div>

			<div className="errors-container">
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<button
				type="submit"
				className="friend-form-submit-btn"
				disabled={Object.keys(errors).length > 0}>Submit</button>
		</form>
	);
};

export default AddFriendForm;
