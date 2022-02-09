import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTransactionRecords } from '../../store/bills';

import TransactionRecordDetail from './TransactionRecordDetail';

const TransactionRecords = () => {

    const dispatch = useDispatch();
    const billsObject = useSelector(state => state.bills);
    const records = Object.values(billsObject.transaction_records).sort(function (a, b) {
        return new Date(b.created_at) - new Date(a.created_at);
    });

    useEffect(() => {
        dispatch(getTransactionRecords());
    }, [dispatch])


    return (
        <div className='transaction-records-container'>
            {records.length === 0 && (
                <h2 id='nothing-to-see'>No transQUACKtions have been made yet. 🦆</h2>
            )}
            {records?.map(record => {
                return <TransactionRecordDetail
                    key={record.id}
                    record={record} />
            })}
        </div>
    )
}

export default TransactionRecords;
