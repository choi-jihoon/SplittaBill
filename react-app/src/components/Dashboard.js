import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getUsersFriends } from "../store/friends";
import { getTransactionRecords } from "../store/bills";

import SidePanel from "./SidePanel";
import DashNav from "./DashNav";
import HistoryTab from "./HistoryTab";
import FriendsTab from "./FriendsTab";
import BillsTab from "./BillsTab";

import { getUserBalance } from "../store/bills";

import './Dashboard.css'

const Dashboard = () => {
	const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user)
	const billsObject = useSelector(state => state.bills);
	const userBalance = billsObject.user_balance.balance;
	useSelector(state => state.friends)


	useEffect(() => {
		dispatch(getUserBalance(sessionUser.id));
		dispatch(getUsersFriends());
		dispatch(getTransactionRecords());
	}, [dispatch, sessionUser.id])


	return (
		<div className='dashboard-container'>
			<SidePanel balance={userBalance} />
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
