import React from "react";
import { NavLink } from "react-router-dom";
const DashNav = (props) => {
	return (
		<div className="dash-nav-container">
			<div className="all-tabs-container">
				<div className="tab-container">
					<NavLink activeClassName="active-tab" exact to="/">
						<i className="fas fa-user"></i>
					</NavLink>
				</div>
				<div className="tab-container">
					<NavLink activeClassName="active-tab" to="/friends">
						<i className="fas fa-user-friends"></i>
					</NavLink>
				</div>
				<div className="tab-container">
					<NavLink
						activeClassName="active-tab"
						to="/transaction-history"
					>
						<i className="fas fa-history"></i>
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default DashNav;
