import React from "react";
import { NavLink } from "react-router-dom";
const DashNav = (props) => {
	return (
		<div>
			<NavLink to="/">Bills</NavLink>
			<NavLink to="/friends">Friends</NavLink>
			<NavLink to="/transaction-history">Transaction History</NavLink>
		</div>
	);
};

export default DashNav;
