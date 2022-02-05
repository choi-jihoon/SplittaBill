import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { addFriend } from "../../store/friends";

const AddFriendForm = ({setShowModal}) => {
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState("");
	const dispatch = useDispatch();

	const onAddFriend = async (e) => {
		e.preventDefault();
        console.log("Clicked add new friend!");
		const data = await dispatch(addFriend(username));
		if (data && data.errors) {
			setErrors(data.errors);
		}
        else {
            setShowModal(false);
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
