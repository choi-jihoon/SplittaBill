import BillExpenses from "../BillExpenses";
import Comments from "../Comments";
import EditBillFormModal from "../EditBillFormModal";
import DeleteBillModal from "../DeleteBillModal";

import "./BillDetails.css";


const BillDetails = ({ bill }) => {

    return (
        <div className='bill-details-modal-container'>
            <div className='bd-edit-delete-btns-container'>
                <EditBillFormModal bill={bill} />
                <DeleteBillModal billId={bill.id} />
            </div>
            <div className='bd-title-total-container'>
                <div className='bd-title-container'>
                    <span className='bd-title-icon'><i className="fas fa-file-invoice-dollar"></i></span>
                    <h2 className='bd-title-text'>{bill.description}</h2>
                </div>
                <div className='bd-total-amount'>${ bill.total_amount }</div>
            </div>
            {/* <div>
                {bill.deadline !== 'None' &&
                <p>
                    DEADLINE: {bill.deadline}
                </p>}
            </div> */}
            <BillExpenses expenses={bill.expenses} />
            <Comments billId={bill.id} />
        </div>
    )
}

export default BillDetails;
