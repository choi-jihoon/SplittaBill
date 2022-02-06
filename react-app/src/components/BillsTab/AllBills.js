import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getBills, getUserExpenses } from '../../store/bills';

import AddBillFormModal from './AddBillFormModal';
import BillDetail from "./BillDetail";
import ExpenseDetail from './ExpenseDetail';



const AllBills = () => {

    const dispatch = useDispatch();
    const billsObject = useSelector(state => state.bills)
    const bills = Object.values(billsObject.bills)
    const expenses = Object.values(billsObject.expenses)

    useEffect(() => {
        dispatch(getBills());
        dispatch(getUserExpenses());
    }, [dispatch])

    return (
        <div className='main-container'>
            <h3>All Bills</h3>
            <AddBillFormModal />
            {bills?.map(bill => {
                return <BillDetail
                    key={bill.id}
                    bill={bill} />
            })}
            <h3>All Expenses (for bills that aren't yours)</h3>
            {expenses?.map(expense => {
                return <ExpenseDetail
                    key={expense.id}
                    expense={expense} />
            })}
        </div>
    )
}

export default AllBills;
