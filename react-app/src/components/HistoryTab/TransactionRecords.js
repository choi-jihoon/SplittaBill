import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTransactionRecords } from '../../store/bills';

import TransactionRecordDetail from './TransactionRecordDetail';
import EmptyTransactionsTab from './EmptyTransactions';

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
        <>
            {records.length === 0 && (
                <EmptyTransactionsTab />
            )}
            <div className='transaction-records-container'>
                {records?.map(record => {
                    return <TransactionRecordDetail
                        key={record.id}
                        record={record} />
                })}
            </div>
        </>
    )
}

export default TransactionRecords;
