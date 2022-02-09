import LoginFormModal from "./auth/LoginFormModal";
import SignUpFormModal from "./auth/SignUpFormModal";
import Footer from "./Footer";
import { ReactComponent as Logo } from "../assets/white-split.svg";
import { ReactComponent as Duck } from "../assets/white-geo.svg";
import { Link } from "react-router-dom";

import "./Splashpage.css";
const SplashPage = () => {
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
				<h3>Start Splitting!</h3>
				<div className="user-actions">
					<LoginFormModal />
					<SignUpFormModal />
				</div>
			</div>
			<Footer />
		</>
	);
};

export default SplashPage;
