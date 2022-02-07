import { useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import { removeFriend } from "../../../store/friends";
import FriendDetailsModal from "../FriendDetailsModal";

const Friend = ({id, friendId, image, username, balance}) => {
	const dispatch = useDispatch();
	image = image ? image : "https://splitabill.s3.us-east-2.amazonaws.com/f395dfcdb332496bb5700cc328339e5d.png";
	const onRemoveFriend = async (e) => {
		e.preventDefault();
		await dispatch(removeFriend(id));
		return <Redirect to="/friends" />;
	}

	return (
		<div>
			<div className="profile-pic-div">
				<img src={image} className="profile-pic" ></img>
			</div>
			{balance > 0 ?
				<p>{username} owes you <span className="positive-payment">${balance}</span></p>
				: (balance < 0 ?
				<p>you owe {username} <span className="negative-payment">${Math.abs(balance).toFixed(2)}</span></p>
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
