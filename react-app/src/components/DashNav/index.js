import React from "react";
import { NavLink } from "react-router-dom";
const DashNav = (props) => {
	return (
		<div className='dash-nav-container'>
			<div className='all-tabs-container'>
				<div className='tab-container'>
					<NavLink to="/">Bills</NavLink>
				</div>
				<div className='tab-container'>
					<NavLink to="/friends">Friends</NavLink>
				</div>
				<div className='tab-container'>
					<NavLink to="/transaction-history">Transactions</NavLink>
				</div>
			</div>
		</div>
	);
};

export default DashNav;
