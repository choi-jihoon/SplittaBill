import React from "react";
import TransactionRecords from "./TransactionRecords";

const HistoryTab = (props) => {
	return (
		<div className='main-container'>
			<h2>Transaction History</h2>
			<TransactionRecords />
		</div>
	);
};

export default HistoryTab;
