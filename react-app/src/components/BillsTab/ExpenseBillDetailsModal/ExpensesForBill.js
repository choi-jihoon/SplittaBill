import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getExpensesForBill } from '../../../store/bills';
import ExpenseDetail from './ExpenseDetail';

const ExpensesForBill = ({ billId }) => {

    const dispatch = useDispatch();
    const billsObject = useSelector(state => state.bills)
    const expenses = Object.values(billsObject.expenses_by_bill)


    useEffect(() => {
        dispatch(getExpensesForBill(billId));
    }, [dispatch, billId])

    return (
        <div>
            {expenses?.map(expense => {
                return <ExpenseDetail
                    key={expense.id}
                    expense={expense} />
            })}
        </div>
    )
}

export default ExpensesForBill;
