import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { removeFriend } from "../../../store/friends";
import { getTransactionsForFriend } from "../../../store/bills";
import FriendDetailsModal from "../FriendDetailsModal";

const Friend = ({id, friendId, username, balance}) => {
	const dispatch = useDispatch();
	// const recordsObj = useSelector(state => state.bills.transaction_records);

    // const records = Object.values(recordsObj);

	// // TODO: fetch for transaction records relating to current_user and this friend
	// useEffect(() => {
	// 	dispatch(getTransactionsForFriend(friendId))
	// }, [dispatch])

	const onRemoveFriend = async (e) => {
		e.preventDefault();
		await dispatch(removeFriend(id));
		return <Redirect to="/friends" />;
	}

	return (
		<div>
			{balance > 0 ?
				<p>{username} owes you ${balance}</p>
				: (balance < 0 ?
				<p>you owe {username} ${Math.abs(balance).toFixed(2)}</p>
				:  <p>All Even with {username}!</p>)
			}

			<FriendDetailsModal username={username} balance={balance} friendId={friendId} />

			{parseFloat(balance) === 0 ? (
				<button onClick={onRemoveFriend}>Delete Friend</button>
				): null}

		</div>
	);
};

export default Friend;
