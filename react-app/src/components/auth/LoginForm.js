import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import DemoLogin from "./DemoLogin";
import "./LoginForm.css";

const LoginForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		}
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<form onSubmit={onLogin} className="login-form">
			<div className="modal-head">Login</div>
			<div>
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>

			<input
				name="email"
				type="text"
				placeholder="Email"
				value={email}
				onChange={updateEmail}
			/>

			<input
				name="password"
				type="password"
				placeholder="Password"
				value={password}
				onChange={updatePassword}
			/>
			<button type="submit">Login</button>
			<DemoLogin />
		</form>
	);
};

export default LoginForm;
