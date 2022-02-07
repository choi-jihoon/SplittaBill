import React from "react";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import AddFriendFormModal from "../FriendsTab/AddFriendForm/AddFriendFormModal";

import './SidePanel.css'

const SidePanel = (props) => {
	const sessionUser = useSelector(state => state.session.user)

	return (
		<div className='side-panel'>
			<div id='curr-user'>
				<h2>
					{sessionUser.username}
				</h2>
			</div>
			<div id='add-friend-button-container'>
				<AddFriendFormModal />
			</div>
			<div id='logout-button-container'>
				<LogoutButton />
			</div>
		</div>
	);
};

export default SidePanel;
