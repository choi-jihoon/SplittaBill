import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getExpensesForBill } from '../../../store/bills';
// import ExpenseDetail from './ExpenseDetail';
import BillDetailsExpenses from '../BillDetailsModal/BillDetailsExpenses';

const ExpensesForBill = ({ bill }) => {

    const dispatch = useDispatch();
    const billsObject = useSelector(state => state.bills)
    const expenses = Object.values(billsObject.expenses_by_bill)


    useEffect(() => {
        dispatch(getExpensesForBill(bill.id));
    }, [dispatch, bill.id])

    return (
        <div>
            {expenses?.map(expense => {
                if (expense.payer_id == bill.owner_id) {
                    return null;
                }
                return <BillDetailsExpenses
                    key={expense.id}
                    expense={expense} />
            })}
        </div>
    )
}

export default ExpensesForBill;
