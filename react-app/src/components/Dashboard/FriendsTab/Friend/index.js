import { useState } from "react";

import { formatToUSD } from "../../../../utils/formatToUSD";
import { Modal } from "../../../../context/Modal";
import FriendDetails from '../FriendDetailsModal/';
import DeleteFriendModal from '../DeleteFriendModal';

import "./Friend.css";

const Friend = ({id, friendId, image, username, balance}) => {
	const [showModal, setShowModal] = useState(false);

	const formattedBalance = formatToUSD(balance)

	return (
		<>
			<div className="friend-container" onClick={() => setShowModal(true)}>
				<div className="profile-pic-div">
					<img src={image} className="friends-profile-pic" alt={`${username} profile`} ></img>
				</div>
				<div className="friend-info">
					{balance > 0 ?
						<h3><span className="bold">{username}</span> owes you <span className="positive-payment ">{formattedBalance}</span></h3>
						: (balance < 0 ?
						<h3>You owe <span className="bold">{username} </span> <span className="negative-payment"> {formattedBalance}</span></h3>
						:  <h3>All Even with <span className="bold">{username}</span>!</h3>)
					}
				</div>
				{parseFloat(balance) === 0 ? (
					<DeleteFriendModal id={id} onClick={(e) => {e.stopPropagation(); setShowModal(false)}}/>
					): <p></p>}


			</div>
			<div>
				{(showModal) && (
				<Modal onClose={() => setShowModal(false)}>
					<FriendDetails showModal={setShowModal} username={username} balance={balance} friendId={friendId} image={image} />
				</Modal>
				)}

			</div>
		</>
	);
};

export default Friend;
