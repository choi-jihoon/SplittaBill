import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ExpensesForBill from "./ExpensesForBill";
import Comments from "./Comments";

const ExpenseBill = () => {
    const { expenseId } = useParams();
    const bills = useSelector(state => state.bills)
    const expenseObject = bills.expenses
    const bill = expenseObject[expenseId].bill


    return (
        <div className='main-container'>
            <h3>{bill.description}</h3>
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
        </div>
    )
}

export default ExpenseBill;
