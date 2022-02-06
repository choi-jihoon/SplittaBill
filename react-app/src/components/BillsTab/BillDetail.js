import EditBillFormModal from "./EditBillFormModal";
import DeleteBillModal from "./DeleteBillModal";
import BillExpenses from "./BillExpenses";
import Comments from "./Comments";

const BillDetail = ({ bill }) => {
	return (
		<div>
			<h3>{bill.description}</h3>
			<ul>
				<li>OWNER: {bill.owner_name}</li>
				<li>TOTAL AMOUNT: {bill.total_amount}</li>
			</ul>
			<EditBillFormModal bill={bill} />
			<DeleteBillModal billId={bill.id} />
			{/* <BillExpenses expenses={bill.expenses} /> */}
			<Comments billId={bill.id} />
		</div>
	);
};

export default BillDetail;
