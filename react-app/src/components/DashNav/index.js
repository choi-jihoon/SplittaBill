import React from "react";
import { NavLink } from "react-router-dom";
const DashNav = (props) => {
	return (
		<div className="dash-nav-container">
			<div className="all-tabs-container">
				<NavLink activeClassName="active-tab" exact to="/">
					<div className="tab-container">
						<i className="fas fa-user"></i>
					</div>
				</NavLink>
				<NavLink activeClassName="active-tab" to="/friends">
					<div className="tab-container">
						<i className="fas fa-user-friends"></i>
					</div>
				</NavLink>
				<NavLink activeClassName="active-tab" to="/transaction-history">
					<div className="tab-container">
						<i className="fas fa-history"></i>
					</div>
				</NavLink>
			</div>
		</div>
	);
};

export default DashNav;
