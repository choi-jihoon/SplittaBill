import { useSelector } from "react-redux";

const TransactionRecordDetail = ({ record }) => {

    const sessionUser = useSelector(state => state.session.user)
    let payer;
    let recipient;
    let amountColor;

    if (record.payer_name === sessionUser.username) {
        payer = "You"
        amountColor = "negative-payment"
    } else {
        payer = record.payer_name
        amountColor = "positive-payment"
    }

    if (record.recipient_name === sessionUser.username) {
        recipient = "you"
    } else {
        recipient = record.recipient_name
    }

    return (
        <div className='transaction-record-detail-container'>
            <div className='record-date'>
                {record.created_at.slice(0,16)}
            </div>
            <div className='record-text'>
                {payer} paid {recipient} <span className={amountColor}>${record.amount_paid}</span>
            </div>
        </div>
    )
}

export default TransactionRecordDetail;
