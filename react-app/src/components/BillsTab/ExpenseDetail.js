
const ExpenseDetail = ({ expense }) => {
    return (
        <div>
            <h3>Expense Detail</h3>
            <ul>
                <li>
                    PAYER: { expense.payer_name }
                </li>
                <li>
                    INITIAL CHARGE: { expense.initial_charge }
                </li>
                <li>
                    AMOUNT DUE: { expense.amount_due }
                </li>
                <li>
                    SETTLED?: {expense.settled ? "YES" : "NO"}
                </li>
            </ul>
        </div>
    )
}

export default ExpenseDetail;
