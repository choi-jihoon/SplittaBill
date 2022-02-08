import { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import { removeFriend } from "../../../store/friends";
import { Modal } from "../../../context/Modal";
import FriendDetails from '../FriendDetailsModal/';
import "./Friend.css";

const Friend = ({id, friendId, image, username, balance}) => {
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	image = image ? image : "https://splitabill.s3.us-east-2.amazonaws.com/f395dfcdb332496bb5700cc328339e5d.png";

	const onRemoveFriend = async (e) => {
		e.preventDefault();
		await dispatch(removeFriend(id));
		return <Redirect to="/friends" />;
	}

	return (
		<>
			<div className="friend-container" onClick={() => setShowModal(true)}>
				<div className="profile-pic-div">
					<img src={image} className="profile-pic" ></img>
				</div>
				{balance > 0 ?
					<p><span className="bold">{username}</span> owes you <span className="positive-payment">${balance}</span></p>
					: (balance < 0 ?
					<p>you owe <span className="bold">{username}</span> <span className="negative-payment">${Math.abs(balance).toFixed(2)}</span></p>
					:  <p>All Even with <span className="bold">{username}</span>!</p>)
				}
				{parseFloat(balance) === 0 ? (
					<button onClick={onRemoveFriend} className="remove-friend-btn"><i className="fas fa-minus-square"></i></button>
					): <p></p>}


			</div>
			<div>
				{(showModal) && (
				<Modal onClose={() => setShowModal(false)}>
					<FriendDetails showModal={setShowModal} username={username} balance={balance} friendId={friendId} />
				</Modal>
				)}

			</div>
		</>
	);
};

export default Friend;
