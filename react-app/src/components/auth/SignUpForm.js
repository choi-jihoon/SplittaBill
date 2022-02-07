import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "./LoginForm.css";
const SignUpForm = () => {
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [image, setImage] = useState(null);
	const [imageLoading, setImageLoading] = useState(false);
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onSignUp = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		if (password === repeatPassword) {
			formData.append("username", username);
			formData.append("email", email);
			formData.append("password", password);
			if (image) {
				formData.append("image", image);
				setImageLoading(true);
			}
			const data = await dispatch(signUp(formData));
			setImageLoading(false);
			if (data) {
				console.log(data);
				setErrors(data);
				setImageLoading(false);
			}
		}
	};
	const updateImage = (e) => {
		const file = e.target.files[0];
		setImage(file);
	};
	const updateUsername = (e) => {
		setUsername(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = (e) => {
		setRepeatPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<form onSubmit={onSignUp} className="signup-form">
			<div>
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>

			<input
				type="text"
				name="username"
				onChange={updateUsername}
				placeholder="Username"
				value={username}
			></input>

			<input
				type="text"
				name="email"
				placeholder="Email"
				onChange={updateEmail}
				value={email}
			></input>

			<input
				type="password"
				name="password"
				placeholder="Password"
				onChange={updatePassword}
				value={password}
			></input>

			<input
				type="password"
				name="repeat_password"
				placeholder="Confirm Password"
				onChange={updateRepeatPassword}
				value={repeatPassword}
				required={true}
			></input>
			<input type="file" accept="image/*" onChange={updateImage}></input>

			<button type="submit">Sign Up</button>
			{imageLoading && <p>Loading...</p>}
		</form>
	);
};

export default SignUpForm;
