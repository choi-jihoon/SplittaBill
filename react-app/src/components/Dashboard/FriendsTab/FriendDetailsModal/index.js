import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getTransactionsForFriend } from "../../../../store/bills";
import { formatToUSD } from "../../../../utils/formatToUSD";
import TransactionRecordDetail from "../../HistoryTab/TransactionRecords/TransactionRecordDetail";

import "./FriendDetails.css";

const FriendDetails = ({ showModal, friendId, username, balance, image }) => {
	const dispatch = useDispatch();
	const recordsObj = useSelector(
		(state) => state.bills.transaction_records_by_friend
	);

	const records = Object.values(recordsObj).sort(function (a, b) {
		return new Date(b.created_at) - new Date(a.created_at);
	});

	useEffect(() => {
		dispatch(getTransactionsForFriend(friendId));
	}, [dispatch, friendId]);

	return (
		<div className="friend-details-container">
			<button className="close-modal" onClick={() => showModal(false)}>
				<i className="fas fa-minus"></i>
			</button>
			<div className="friend-details-header">
				<div className="profile-pic-div friends-details-profile-pic-div">
					<img
						src={image}
						className="friends-profile-pic"
						alt={`${username} profile`}
					></img>
				</div>
				<div>
					<h3>{username}</h3>
					{Number(balance) !== 0 ? (
						<p>
							Current Balance:{" "}
							{ formatToUSD(balance) }
						</p>
					) : (
						<p>All settled up!</p>
					)}
				</div>
			</div>

			<h4>Transaction History with {username}</h4>
			<div className="friend-transactions-container">
				{records.length === 0 ? <p>Nothing to see here yet!</p> : null}
				{records?.map((record) => {
					return (
						<div className="friend-detail-record" key={record.id}>
							<TransactionRecordDetail
								key={record.id}
								record={record}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default FriendDetails;
