
const TransactionRecordDetail = ({ record }) => {
    return (
        <div>
            {record.payer_name} paid {record.recipient_name} ${record.amount_paid} on {record.created_at}
        </div>
    )
}

export default TransactionRecordDetail;
