import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { } from "../../store/friends";

const AddFriendForm = () => {
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState("");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onAddFriend = async (e) => {
		e.preventDefault();
        console.log("Clicked add new friend!");
		// const data = await dispatch(login(email, password));
		// if (data) {
		// 	setErrors(data);
		// }
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
				/>
			</div>

            {/* <button>Cancel</button> */}
			<button type="submit">Add Friend</button>
		</form>
	);
};

export default AddFriendForm;
