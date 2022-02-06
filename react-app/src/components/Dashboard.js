import { Route, Switch } from "react-router-dom";
import SidePanel from "./SidePanel";
import DashNav from "./DashNav";
import HistoryTab from "./HistoryTab";
import FriendsTab from "./FriendsTab";
import BillsTab from "./BillsTab";
import ExpenseBill from "./BillsTab/ExpenseBill";

const Dashboard = () => {
	return (
		<>
			<h1>USER DASHBOARD</h1>
			<SidePanel />
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
				<Route path='/expenses/:expenseId/bill'>
					<ExpenseBill />
				</Route>
			</Switch>
		</>
	);
};

export default Dashboard;
