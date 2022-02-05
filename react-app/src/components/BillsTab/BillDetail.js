import DeleteBillModal from "./DeleteBillModal";
import BillExpenses from "./BillExpenses";

const BillDetail = ({ bill }) => {
    return (
        <div>
            <h3>Bill Detail</h3>
            <ul>
                <li>
                    OWNER ID: { bill.owner_id }
                </li>
                <li>
                    TOTAL AMOUNT: { bill.total_amount }
                </li>
                <li>
                    DESCRIPTION: { bill.description }
                </li>
            </ul>
            <BillExpenses expenses={bill.expenses} />
            <DeleteBillModal billId={bill.id} />
        </div>
    )
}

export default BillDetail;
