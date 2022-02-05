import React from "react";
import Comments from "./Comments";
import AllBills from "./AllBills";

const BillsTab = (props) => {
	return (
		<div>
			<div>Bills Tab</div>
			<AllBills />
			<Comments />
		</div>
	);
};

export default BillsTab;
