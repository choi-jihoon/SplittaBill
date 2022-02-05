import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getBills } from '../../store/bills';

import AddBillFormModal from './AddBillFormModal';
import BillDetail from "./BillDetail";

const AllBills = () => {

    const dispatch = useDispatch();
    const billsObject = useSelector(state => state.bills)
    const bills = Object.values(billsObject)

    useEffect(() => {
        dispatch(getBills());
    }, [dispatch])

    return (
        <div>
            <h3>All Bills</h3>
            <AddBillFormModal />
            {bills?.map(bill => {
                return <BillDetail
                    key={bill.id}
                    bill={bill} />
            })}
        </div>
    )
}

export default AllBills;
