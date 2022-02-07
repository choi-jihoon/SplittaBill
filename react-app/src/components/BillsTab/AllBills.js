import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getBills, getUserExpenses } from '../../store/bills';

import AddBillFormModal from './AddBillFormModal';
import BillDetail from "./BillDetail";
import ExpenseDetail from './ExpenseDetail';

import './BillsTab.css';


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
        <div className='all-bills-container'>
            <div className='add-bill-button-container'>
                <AddBillFormModal />
            </div>
            <h3>Bills</h3>
            {bills?.map(bill => {
                return <BillDetail
                    key={bill.id}
                    bill={bill} />
            })}
            <h3>Expenses</h3>
            {expenses?.map(expense => {
                return <ExpenseDetail
                    key={expense.id}
                    expense={expense} />
            })}
        </div>
    )
}

export default AllBills;
