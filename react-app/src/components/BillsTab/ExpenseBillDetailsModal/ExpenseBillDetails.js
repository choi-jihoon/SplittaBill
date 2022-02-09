import { useSelector } from "react-redux";

import ExpensesForBill from "./ExpensesForBill";
import Comments from "../Comments";

import "./ExpenseBillDetails.css";

const ExpenseBillDetails = ({ expense, showModal }) => {
    const expenseId = expense.id;
    const bills = useSelector(state => state.bills)
    const expenseObject = bills.expenses
    const bill = expenseObject[expenseId].bill


    return (
        <div className='bill-details-modal-container'>
            <div className="bd-edit-delete-btns-container">
                <button
                    className="close-modal"
                    onClick={() => showModal(false)}
                >
                    <i className="fas fa-minus"></i>
                </button>
            </div>
            <div className='bd-title-total-container'>
                <div className='bd-paid-for-bill'>
                    <div className='bd-paid-by-text'>
                        <span className='bold'>{bill.owner_name}</span> paid for
                    </div>
                    <div className='bd-title-container'>
                        <span className='bd-title-icon'><i className="fas fa-file-invoice-dollar"></i></span>
                        <h2 className='bd-title-text'>
                            {bill.description}
                        </h2>
                    </div>
                </div>
                <div className='bd-total-amount'>${bill.total_amount}</div>
            </div>
            <ExpensesForBill bill={bill} />
            <Comments billId={bill.id} />
        </div>
    )
}

export default ExpenseBillDetails;
