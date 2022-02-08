import EditBillFormModal from "./EditBillFormModal";
import DeleteBillModal from "./DeleteBillModal";
import BillDetailsModal from "./BillDetailsModal";

const Bill = ({ bill }) => {
	return (
		<div className='bill-container'>
			<div className='bill-info-container'>
				<div className='bill-owner-description-container'>
					<div className='bill-owner-name'>
						{bill.owner_name} paid for
					</div>
					<h2 className='bill-description'>
						<span><i className="fas fa-file-invoice-dollar"></i></span>
						{bill.description}
					</h2>
				</div>
				<div className='bill-total-amount'>
					TOTAL AMOUNT: {bill.total_amount}
				</div>
				{/* {bill.deadline !== 'None' &&
					<p>
						DEADLINE: {bill.deadline}
					</p>
				} */}

			</div>
			<div className='edit-delete-bill-buttons-container'>
				<div className='edit-bill-button-container'>
					<EditBillFormModal bill={bill} />
				</div>
				<div className='delete-bill-button-container'>
					<DeleteBillModal billId={bill.id} />
				</div>
			</div>
			{/* <BillDetailsModal bill={bill} /> */}
		</div>
	);
};

export default Bill;
