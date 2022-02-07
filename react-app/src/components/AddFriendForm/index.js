import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { addFriend } from "../../store/friends";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
		<form onSubmit={onAddFriend}>
			<div>
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<div>
				<label htmlFor="username">Username</label>
				<input
					name="username"
					type="text"
					placeholder="Username"
					value={username}
					onChange={updateUsername}
                    required={true}
				/>
			</div>

            {/* <button>Cancel</button> */}
			<button type="submit">Add Friend</button>
		</form>
	);
};

export default AddFriendForm;
