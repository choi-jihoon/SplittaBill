import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


// import NavBar from './components/NavBar';
// import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
import { authenticate } from "./store/session";

import Dashboard from "./components/Dashboard";
import SplashPage from "./components/SplashPage";

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	const sessionUser = useSelector((state) => state.session.user);

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			<Switch>
				<Route path="/">
					{sessionUser ? <Dashboard /> : <SplashPage />}
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
