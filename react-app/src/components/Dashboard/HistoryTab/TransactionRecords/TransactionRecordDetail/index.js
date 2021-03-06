import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { formatToUSD } from "../../../../../utils/formatToUSD";

const TransactionRecordDetail = ({ record }) => {
    const location = useLocation();

    const sessionUser = useSelector(state => state.session.user)
    let payer;
    let recipient;
    let amountColor;
    let imageBubble = "";
    let imageAlt = ""

    if (record.payer_name === sessionUser.username) {
        imageBubble = record.recipient_image;
        imageAlt = record.recipient_name + "-pic";
        payer = "You"
        amountColor = "negative-payment"
    } else {
        imageBubble = record.payer_image;
        imageAlt = record.payer_name + "-pic";
        payer = record.payer_name
        amountColor = "positive-payment"
    }

    if (record.recipient_name === sessionUser.username) {
        recipient = "you"
    } else {
        recipient = record.recipient_name
    }

    return (
        <>
            {(location.pathname === "/friends") ?
                <div className='transaction-record-detail-container'>
                    <div className="record-image-text">
                        <img src={imageBubble} alt={imageAlt} />
                        <div className='record-text'>
                            <h3 className="testing-ellipses">
                                <span className={payer !== "You" ? "bold" : ""}>{payer}</span> paid <span className={recipient !== "you" ? "bold" : ""}>{recipient}</span>
                                <span className={`${amountColor}`}> {formatToUSD(record.amount_paid)} </span>
                                for <span className="bold">{record.transaction_description}</span>

                            </h3>
                        </div>
                        <div className='record-date'>
                            <p>{record.created_at.slice(0, 16)}</p>
                        </div>
                    </div>
                </div>

                :

                <div className='transactions-tab-records-container'>
                    <div className='tb-image'>
                        <img src={imageBubble} alt={imageAlt} />
                    </div>
                    <div className='tb-record-text'>
                        <h3 className='testing-ellipses' id='tb-text'>
                            <span className={payer !== "You" ? "bold" : ""}>{payer}</span> paid <span className={recipient !== "you" ? "bold" : ""}>{recipient}</span>
                            <span className={`${amountColor}`}> {formatToUSD(record.amount_paid)} </span>
                            for <span className="bold">{record.transaction_description}</span>
                        </h3>
                    </div>
                    <div className='tb-record-date'>
                        <p>{record.created_at.slice(0, 16)}</p>
                    </div>
                </div>
            }
        </>
    )
}

export default TransactionRecordDetail;
