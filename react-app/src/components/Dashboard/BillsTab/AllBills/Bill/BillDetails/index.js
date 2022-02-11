import BillExpenses from "./BillExpenses";
import Comments from "./Comments";
import EditBillFormModal from "../EditBillFormModal";
import DeleteBillModal from "../DeleteBillModal";

import "./BillDetails.css";

const BillDetails = ({ bill, showModal }) => {
	return (
		<div className="bill-details-modal-container">
			<button
				className="close-modal"
				onClick={() => showModal(false)}
			>
				<i className="fas fa-minus"></i>
			</button>
			<div className="bd-edit-delete-btns-container">
				<EditBillFormModal bill={bill} />
				<DeleteBillModal billId={bill.id} />
			</div>
			<div className="bd-title-total-container">
				<div className="bd-title-container">
					<span className="bd-title-icon">
						<i className="fas fa-file-invoice-dollar"></i>
					</span>
					<h2 className="bd-title-text">{bill.description}</h2>
				</div>
				<div className="bd-total-amount brand-font">${bill.total_amount}</div>
			</div>
			{bill.deadline !== "None" && (
				<div className="bd-bill-deadline">
					<i className="fas fa-calendar-alt"></i>
					<span>{`${bill.deadline.split("-")[1]}/${
						bill.deadline.split("-")[2]
					}/${bill.deadline.split("-")[0]}`}</span>
				</div>
			)}
			<div className='bd-expenses-container'>
				<BillExpenses expenses={bill.expenses} />
			</div>
			<Comments billId={bill.id} />
		</div>
	);
};

export default BillDetails;
