import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import LogoutButton from "../../auth/LogoutButton";
import AddFriendFormModal from "../FriendsTab/AddFriendForm/AddFriendFormModal";
import AddBillFormModal from "../BillsTab/AllBills/AddBillFormModal";
import EditUserModal from "./EditUserModal";
import AboutLinks from "./AboutLinks";

import { ReactComponent as Logo } from "../../../assets/white-split.svg";
import { ReactComponent as Duck } from "../../../assets/white-geo.svg";

import "./SidePanel.css";

const SidePanel = ({ balance }) => {
	const sessionUser = useSelector((state) => state.session.user);
	const imageUrl = sessionUser.image

	return (
		<div className="side-panel">
			<Link to="/">
				<div className="logo side-panel-logo">
					<Logo />
					<Duck />
				</div>
			</Link>
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
					<p>Balance: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(balance)}</p>
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
