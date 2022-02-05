
const TransactionRecordDetail = ({ record }) => {
    return (
        <div>
            {record.payer_name} paid {record.recipient_name} ${record.amount_paid}
        </div>
    )
}

export default TransactionRecordDetail;
