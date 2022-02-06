import React from "react";
import TransactionRecords from "./TransactionRecords";

import './TransactionRecords.css'

const HistoryTab = (props) => {
	return (
		<div className='main-container'>
			<TransactionRecords />
		</div>
	);
};

export default HistoryTab;
