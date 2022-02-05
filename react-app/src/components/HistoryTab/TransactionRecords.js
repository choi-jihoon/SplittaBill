import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTransactionRecords } from '../../store/bills';

import TransactionRecordDetail from './TransactionRecordDetail';

const TransactionRecords = () => {

    const dispatch = useDispatch();
    const billsObject = useSelector(state => state.bills);
    const records = Object.values(billsObject.transaction_records);

    useEffect(() => {
        dispatch(getTransactionRecords());
    }, [dispatch])


    return (
        <div>
            <h3>All Transaction Records</h3>
            {records?.map(record => {
                return <TransactionRecordDetail
                    key={record.id}
                    record={record} />
            })}
        </div>
    )
}

export default TransactionRecords;
