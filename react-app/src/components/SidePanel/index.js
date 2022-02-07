import React from "react";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import AddFriendFormModal from "../AddFriendForm/AddFriendFormModal";
import AddBillFormModal from "../BillsTab/AddBillFormModal";

import "./SidePanel.css";

const SidePanel = (props) => {
	const sessionUser = useSelector((state) => state.session.user);
	const imageUrl = sessionUser.image
		? sessionUser.image
		: "https://splitabill.s3.us-east-2.amazonaws.com/f395dfcdb332496bb5700cc328339e5d.png";

	return (
		<div className="side-panel">
			<div className="pic-and-name-div">
				<div className="profile-pic-div">
					<img
						src={imageUrl}
						alt="user_photo"
						loading="lazy"
						className="profile-pic"
					></img>
				</div>
				<div id="curr-user">
					<h2>{sessionUser.username}</h2>
				</div>
			</div>
			<div id="add-bill-button-container">
				<AddBillFormModal />
			</div>
			<div id="add-friend-button-container">
				<AddFriendFormModal />
			</div>
			<div id="logout-button-container">
				<LogoutButton />
			</div>
		</div>
	);
};

export default SidePanel;
