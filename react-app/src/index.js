import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import configureStore from "./store";
import { ModalProvider } from "./context/Modal";
import App from "./App";

import "./index.css";

const store = configureStore();

function Root() {
	return (
		<Provider store={store}>
			<ModalProvider>
				<BrowserRouter>
					<div className="whole-page-container">
						<App />
					</div>
				</BrowserRouter>
			</ModalProvider>
		</Provider>
	);
}

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	document.getElementById("root")
);
