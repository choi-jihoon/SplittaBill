import EditBillFormModal from "./EditBillFormModal";
import DeleteBillModal from "./DeleteBillModal";
import BillExpenses from "./BillExpenses";
import Comments from "./Comments";

const BillDetail = ({ bill }) => {
	return (
		<div>
			<h3>Bill Detail</h3>
			<ul>
				<li>OWNER ID: {bill.owner_id}</li>
				<li>TOTAL AMOUNT: {bill.total_amount}</li>
				<li>DESCRIPTION: {bill.description}</li>
			</ul>
			<EditBillFormModal bill={bill} />
			<DeleteBillModal billId={bill.id} />
			<BillExpenses expenses={bill.expenses} />
			<Comments billId={bill.id} />
		</div>
	);
};

export default BillDetail;
