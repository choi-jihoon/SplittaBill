import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { authenticate } from "./store/session";
import SplashPage from "./components/SplashPage";
import Dashboard from "./components/Dashboard";
import ErrorPage from "./components/ErrorPage";


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
				<Route exact path={["/", "/friends", "/transaction-history"]}>
					{sessionUser ? <Dashboard /> : <SplashPage />}
				</Route>
				<Route>
					<ErrorPage />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
