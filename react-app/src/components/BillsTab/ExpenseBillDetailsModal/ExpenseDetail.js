import { useSelector } from "react-redux";
import { useState } from "react";
import { Modal } from "../../../context/Modal";
import ExpenseBillDetails from "./ExpenseBillDetails";

import SettleUpModal from "../SettleUp/SettleUpModal";

const ExpenseDetail = ({ expense }) => {
	const [showModal, setShowModal] = useState(false);

	const sessionUser = useSelector((state) => state.session.user);

	const image = expense.bill.owner_image;

	return (
		<div className="bill-container-and-buttons">
			<div className="bill-container" onClick={() => setShowModal(true)}>
				<div className="profile-pic-div bill-pic-div">
					<img
						src={image}
						className="profile-pic bill-profile-pic"
						alt={`${expense.bill.owner_name} profile`}
					></img>
				</div>
				<div className="bill-owner-description-container">
					<div className="bill-owner-name">
						You owe {expense.bill.owner_name} for
					</div>
					<h2 className="bill-description">
						<span className="invoice-icon">
							<i className="fas fa-receipt"></i>
						</span>
						{/* {expense.bill.description} Expense */}
						<p className="testing-ellipses">
							{expense.bill.description}
						</p>
						<span>
							{expense.settled ? (
								<i className="fas fa-check settled-true"></i>
							) : (
								<i className="fas fa-times settled-false"></i>
							)}
						</span>
					</h2>
				</div>
				<div
					className={
						!expense.settled
							? "negative-payment bill-total-amount brand-font"
							: "bill-total-amount brand-font"
					}
				>
					{expense.settled
						? "All Settled Up!"
						: `-${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(expense.amount_due)}`}
				</div>
			</div>
			<div className="settle-up-container">
				{!expense.settled && expense.payer_id === sessionUser.id && (
					<SettleUpModal expense={expense} />
				)}
			</div>
			<div>
				{showModal && (
					<Modal onClose={() => setShowModal(false)}>
						<ExpenseBillDetails
							showModal={setShowModal}
							expense={expense}
						/>
					</Modal>
				)}
			</div>
		</div>
	);
};

export default ExpenseDetail;
