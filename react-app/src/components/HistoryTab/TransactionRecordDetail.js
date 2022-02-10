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
                <h3>
                    <span><i className="fas fa-coins"></i> </span>
                    <span className={payer !== "You" ? "bold" : ""}>{payer}</span> paid <span className={recipient !== "you" ? "bold" : ""}>{recipient}</span>
                    <span className={`${amountColor} bold`}> ${record.amount_paid} </span>
                    for <span className="bold">{record.transaction_description}</span>

                </h3>
            </div>
        </div>
    )
}

export default TransactionRecordDetail;
