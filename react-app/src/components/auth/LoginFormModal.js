import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";

function LoginFormModal() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div
				id="login"
				className="login-signup"
				onClick={() => setShowModal(true)}
			>
				Log In
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<LoginForm />
				</Modal>
			)}
		</>
	);
}

export default LoginFormModal;
