import BillExpenses from "../BillExpenses";
import Comments from "../Comments";
import EditBillFormModal from "../EditBillFormModal";
import DeleteBillModal from "../DeleteBillModal";


const BillDetails = ({ bill, showModal }) => {

    return (
        <>
            <EditBillFormModal bill={bill} />
            <DeleteBillModal billId={bill.id} />
            <span><i className="fas fa-file-invoice-dollar"></i></span>
            <h3>{bill.description}</h3>
                    <ul>
                        <li>
                            PAID BY: { bill.owner_name }
                        </li>
                        <li>
                            TOTAL AMOUNT: { bill.total_amount }
                        </li>
                    </ul>
            <BillExpenses expenses={bill.expenses} />
            <Comments billId={bill.id} />
        </>
    )
}

export default BillDetails;
