import { Route, Switch } from "react-router-dom";
import SidePanel from "./SidePanel";
import DashNav from "./DashNav";
import HistoryTab from "./HistoryTab";
import FriendsTab from "./FriendsTab";
import BillsTab from "./BillsTab";

import './Dashboard.css'

const Dashboard = () => {
	return (
		<div className='dashboard-container'>
			<SidePanel />
			<div className='dash-and-main-container'>
			<DashNav />
				<Switch>
					<Route exact path="/">
						<BillsTab />
					</Route>
					<Route path="/friends">
						<FriendsTab />
					</Route>
					<Route path="/transaction-history">
						<HistoryTab />
					</Route>
				</Switch>
			</div>
		</div>
	);
};

export default Dashboard;
