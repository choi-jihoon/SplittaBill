import React from "react";
import Comments from "./Comments";
import AllBills from "./AllBills";

const BillsTab = (props) => {
	return (
		<div className='main-container'>
			<AllBills />
			<Comments />
		</div>
	);
};

export default BillsTab;
