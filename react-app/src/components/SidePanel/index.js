import React from "react";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import AddFriendFormModal from "../FriendsTab/AddFriendForm/AddFriendFormModal";

import "./SidePanel.css";

const SidePanel = (props) => {
	const sessionUser = useSelector((state) => state.session.user);
	const imageUrl = sessionUser.image
		? sessionUser.image
		: "https://splitabill.s3.us-east-2.amazonaws.com/f395dfcdb332496bb5700cc328339e5d.png";

	return (
		<div className="side-panel">
			<div id="curr-user">
				<img
					src={imageUrl}
					style={{ width: 50, height: 50, borderRadius: "50%" }}
					alt="user_photo"
					loading="lazy"
				></img>
				<h2>{sessionUser.username}</h2>
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
