import LoginFormModal from "./auth/LoginFormModal";
import SignUpFormModal from "./auth/SignUpFormModal";
import Footer from "./Footer";
import { ReactComponent as Logo } from "../assets/white-split.svg";

import "./Splashpage.css";


const SplashPage = () => {
	const modalHelper = () => {
		const events = ["mousedown", "click", "mouseup"];
		events.forEach((event) =>
			document.querySelector("#signup").dispatchEvent(
				new MouseEvent(event, {
					view: window,
					bubbles: true,
					cancelable: true,
					buttons: 1,
				})
			)
		);
	};
	return (
		<>
			<nav>
				<div className="logo">
					<Logo />
				</div>
				<div className="user-actions">
					<LoginFormModal />
					<SignUpFormModal />
				</div>
			</nav>
			<div className="splash-content">
				<div className="words-wrapper">
					<p>split</p>
					<div>
						<span> a meal</span>
						<span style={{ color: "var(--dark-blue)" }}>
							{" "}
							a bill
						</span>
						<span> a tab</span>
						<span> a trip</span>
						<span> a ride</span>
						<span> rent</span>
						<span> a meal</span>
					</div>
				</div>
				<div className="start-split-button bold" onClick={modalHelper}>
					Start Splitting!
				</div>
			</div>
			<Footer />
		</>
	);
};

export default SplashPage;
