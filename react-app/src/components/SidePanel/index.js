import React from "react";
import LogoutButton from "../auth/LogoutButton";
import AddFriendFormModal from "../AddFriendForm/AddFriendFormModal";

const SidePanel = (props) => {
	return (
		<div>
			<div>SidePanel</div>
			<LogoutButton />
			<AddFriendFormModal />
		</div>
	);
};

export default SidePanel;
