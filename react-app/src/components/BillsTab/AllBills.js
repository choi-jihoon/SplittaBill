import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getBills, getUserExpenses } from '../../store/bills';

import Bill from "./Bill";
import ExpenseDetail from './ExpenseBillDetailsModal/ExpenseDetail';
import EmptyBillsTab from './EmptyBillsTab';

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
        <>
            <div className='all-bills-container'>
                {bills &&
                    bills?.map(bill => {
                        return <Bill
                            key={bill.id}
                            bill={bill} />
                    })}

                {expenses &&
                    expenses?.map(expense => {
                        return <ExpenseDetail
                            key={expense.id}
                            expense={expense} />
                    })
                }


            </div>
            {(!bills.length && !expenses.length) && <EmptyBillsTab />}
        </>

    )
}

export default AllBills;
