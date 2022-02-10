import React from "react";
import "./ErrorPage.css";
const ErrorPage = (props) => {
	return (
		<div className="error-page-container">
			<div className="error-code-message">
				<h2>-- 404 --</h2>
				<h2>You Quacked the code!</h2>
				<h3>Just kidding though, this page does not exist</h3>
			</div>
		</div>
	);
};

export default ErrorPage;
