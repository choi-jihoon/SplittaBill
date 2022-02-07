import ExpenseDetail from "./ExpenseBillDetailsModal/ExpenseDetail";

const BillExpenses = ({ expenses }) => {
    return (
        <div>
            <h4>Expenses</h4>
            {expenses.map(expense => {
                return <ExpenseDetail
                        key={expense.id}
                        expense={expense} />
            })}
        </div>
    )
}

export default BillExpenses;
