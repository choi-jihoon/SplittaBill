import LoginFormModal from "./auth/LoginFormModal";
import SignUpFormModal from "./auth/SignUpFormModal";
import Footer from "./Footer";
import { ReactComponent as Logo } from "../assets/white-split.svg";
import { ReactComponent as Duck } from "../assets/white-geo.svg";
import "./Splashpage.css";
import { Link } from "react-router-dom";
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
				<div>Start Splitting!</div>
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
