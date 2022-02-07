import { useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import { removeFriend } from "../../store/friends";

const Friend = ({id, username, balance}) => {
	const dispatch = useDispatch();

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
				<p>you owe {username} ${Math.abs(balance)}</p>
				:  <p>All Even with {username}!</p>)
			}

			{parseFloat(balance) === 0 ? (
				<button onClick={onRemoveFriend}>Delete Friend</button>
				): null}

		</div>
	);
};

export default Friend;
