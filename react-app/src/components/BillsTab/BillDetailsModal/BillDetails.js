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
            <div className='bd-title-container'>
                <span><i className="fas fa-file-invoice-dollar"></i></span>
                <h3>{bill.description}</h3>
            </div>
                    <ul>
                        <li>
                            PAID BY: { bill.owner_name }
                        </li>
                        <li>
                            TOTAL AMOUNT: { bill.total_amount }
                        </li>
                        <li>
                            {bill.deadline !== 'None' &&
                            <p>
                                DEADLINE: {bill.deadline}
                            </p>}
                        </li>
                    </ul>
            <BillExpenses expenses={bill.expenses} />
            <Comments billId={bill.id} />
        </div>
    )
}

export default BillDetails;
