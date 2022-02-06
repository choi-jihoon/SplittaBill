import React from "react";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import AddFriendFormModal from "../AddFriendForm/AddFriendFormModal";

const SidePanel = (props) => {
	const sessionUser = useSelector(state => state.session.user)

	return (
		<div id='side-panel'>
			<div id='curr-user'>
				{sessionUser.username}
			</div>
			<div id='logout-button-container'>
				<LogoutButton />
			</div>
			<div id='add-friend-button-container'>
				<AddFriendFormModal />
			</div>
		</div>
	);
};

export default SidePanel;
