import { useSelector } from "react-redux";

import ExpensesForBill from "./ExpensesForBill";
import Comments from "../Comments";

const ExpenseBillDetails = ({ expense, showModal }) => {
    const expenseId = expense.id;
    const bills = useSelector(state => state.bills)
    const expenseObject = bills.expenses
    const bill = expenseObject[expenseId].bill


    return (
        <>
            <h3>
                <span><i className="fas fa-file-invoice-dollar"></i></span>
                {bill.description}
            </h3>
                <ul>
                    <li>
                        PAID BY: { bill.owner_name }
                    </li>
                    <li>
                        TOTAL AMOUNT: { bill.total_amount }
                    </li>
                </ul>
                <ExpensesForBill billId={bill.id} />
                <Comments billId={bill.id} />
        </>
    )
}

export default ExpenseBillDetails;
