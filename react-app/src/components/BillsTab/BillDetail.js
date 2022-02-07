import EditBillFormModal from "./EditBillFormModal";
import DeleteBillModal from "./DeleteBillModal";
import BillExpenses from "./BillExpenses";
import Comments from "./Comments";

const BillDetail = ({ bill }) => {
	return (
		<div className='bill-container'>
			<div className='bill-info-container'>
				<h3>{bill.description}</h3>
				<ul>
					<li>OWNER: {bill.owner_name}</li>
					<li>TOTAL AMOUNT: {bill.total_amount}</li>
					{bill.deadline !== 'None' &&
						<li>DEADLINE: {bill.deadline}</li>
					}
				</ul>
			</div>
			<div className='edit-delete-bill-buttons-container'>
				<div className='edit-bill-button-container'>
					<EditBillFormModal bill={bill} />
				</div>
				<div className='delete-bill-button-container'>
					<DeleteBillModal billId={bill.id} />
				</div>
			</div>
			<BillExpenses expenses={bill.expenses} />
			<Comments billId={bill.id} />
		</div>
	);
};

export default BillDetail;
