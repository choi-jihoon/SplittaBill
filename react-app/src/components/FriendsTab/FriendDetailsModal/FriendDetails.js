import TransactionRecordDetail from "../../HistoryTab/TransactionRecordDetail";

const FriendDetails = ({ showModal, username, balance, records }) => {

    return (
        <>
            <h3>{username} Details</h3>
            {balance != 0 ? <p>Current Balance: {balance}</p> : <p>All settled up!</p>}
            <div>
                <h4>Transaction History with {username}</h4>
                {records?.map(record => {
                    return <TransactionRecordDetail
                        key={record.id}
                        record={record}
                    />
                })}

            </div>

        </>
    )
}

export default FriendDetails;
