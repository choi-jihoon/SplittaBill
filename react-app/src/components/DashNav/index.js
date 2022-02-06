import React from "react";
import { NavLink } from "react-router-dom";
const DashNav = (props) => {
	return (
		<div id='dash-nav-container'>
			<NavLink to="/">Bills</NavLink>
			<NavLink to="/friends">Friends</NavLink>
			<NavLink to="/transaction-history">Transaction History</NavLink>
		</div>
	);
};

export default DashNav;
