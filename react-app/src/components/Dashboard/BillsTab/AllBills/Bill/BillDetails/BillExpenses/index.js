import { useSelector } from "react-redux";

import BillDetailsExpenses from "../../../ExpenseDetail/ExpenseBillDetails/ExpensesForBill/BillDetailsExpenses";

const BillExpenses = ({ expenses }) => {
    const sessionUser = useSelector(state => state.session.user)
    return (
        <div>
            {expenses.map(expense => {
                if (expense.payer_id === sessionUser.id) return null;
                return <BillDetailsExpenses
                        key={expense.id}
                        expense={expense} />
            })}
        </div>
    )
}

export default BillExpenses;
