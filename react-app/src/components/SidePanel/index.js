import React from "react";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import AddFriendFormModal from "../FriendsTab/AddFriendForm/AddFriendFormModal";
import AddBillFormModal from "../BillsTab/AddBillFormModal";
import EditUserModal from "./EditUserModal";
import AboutLinks from "./AboutLinks";

import { ReactComponent as Logo } from "../../assets/white-split.svg";
import { ReactComponent as Duck } from "../../assets/white-geo.svg";

import "./SidePanel.css";

const SidePanel = ({ balance }) => {
	const sessionUser = useSelector((state) => state.session.user);
	const imageUrl = sessionUser.image
		? sessionUser.image
		: "https://splitabill.s3.us-east-2.amazonaws.com/f395dfcdb332496bb5700cc328339e5d.png";

	return (
		<div className="side-panel">
			<div className="logo side-panel-logo">
				<Logo />
				<Duck />
			</div>
			<div className="pic-and-name-div">
				<div className="profile-pic-div">
					<img
						src={imageUrl}
						alt="user_photo"
						loading="lazy"
						className="profile-pic"
					></img>
					<EditUserModal user={sessionUser} />
				</div>
				<div className="username-balance-div" >
					<h3>{sessionUser.username}</h3>
					<p>Balance: {balance >= 0 ? `$${balance}` : `-$${Math.abs(balance)}`} </p>
				</div>
			</div>
			<div id="add-bill-button-container">
				<AddBillFormModal />
			</div>
			<div className="side-panel-buttons">
				<div id="add-friend-button-container">
					<AddFriendFormModal />
				</div>
				<div id="logout-button-container">
					<LogoutButton />
				</div>
			</div>
			<AboutLinks />
		</div>
	);
};

export default SidePanel;
