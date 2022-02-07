import BillExpenses from "../BillExpenses";
import Comments from "../Comments";


const BillDetails = ({ bill, showModal }) => {

    return (
        <>
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
