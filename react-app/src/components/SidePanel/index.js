import React from "react";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import AddFriendFormModal from "../FriendsTab/AddFriendForm/AddFriendFormModal";
import AddBillFormModal from "../BillsTab/AddBillFormModal";

import { getUserBalance } from "../../store/bills";

import { ReactComponent as Logo } from "../../assets/white-split.svg";
import { ReactComponent as Duck } from "../../assets/white-geo.svg";

import "./SidePanel.css";
import EditUserModal from "./EditUserModal";

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
				<div id="curr-user">
					<h2>{sessionUser.username}</h2>
				</div>

			</div>
			<div className='user-balance'>
				Balance: ${balance}
			</div>
			<div className="side-panel-buttons">
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
		</div>
	);
};

export default SidePanel;
