import LoginFormModal from "./auth/LoginFormModal";
import SignUpFormModal from "./auth/SignUpFormModal";
import Footer from "./Footer";
import { ReactComponent as Logo } from "../assets/white-split.svg";
import { ReactComponent as Duck } from "../assets/white-geo.svg";
import { Link } from "react-router-dom";

import "./Splashpage.css";
import { useState } from "react";
import SignUpForm from "./auth/SignUpForm";
import { Modal } from "../context/Modal";
const SplashPage = () => {
	const [showModal, setShowModal] = useState(false);
	const modalHelper = () => {
		setShowModal(true);
		return (
			<>
				{showModal && (
					<Modal onClose={() => setShowModal(false)}>
						<SignUpForm />
					</Modal>
				)}
			</>
		);
	};
	return (
		<>
			<nav>
				<div className="logo">
					<Logo />
					<Duck />
				</div>
				<div className="user-actions">
					<LoginFormModal />
					<SignUpFormModal />
				</div>
			</nav>
			<div className="splash-content">
				<div className="gif"></div>
				{/* <div className="test">TEST</div> */}
				<div onClick={modalHelper}>Start Splitting!</div>
				{/* <div className="user-actions">
					<LoginFormModal />
					<SignUpFormModal />
				</div> */}
			</div>
			<Footer />
		</>
	);
};

export default SplashPage;
