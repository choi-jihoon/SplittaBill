import BillExpenses from "../BillExpenses";
import Comments from "../Comments";


const BillDetails = ({ bill, showModal }) => {

    return (
        <>
            <BillExpenses expenses={bill.expenses} />
            <Comments billId={bill.id} />
        </>
    )
}

export default BillDetails;
