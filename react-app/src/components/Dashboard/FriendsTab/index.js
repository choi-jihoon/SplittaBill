import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUsersFriends } from "../../../store/friends";
import Friend from "./Friend";
import EmptyFriendsTab from "./EmptyFriendsTab";

const FriendsTab = () => {
	const dispatch = useDispatch();
	const friendsById = useSelector((state) => state.friends.byId);
	const friends = Object.values(friendsById);

	useEffect(() => {
		dispatch(getUsersFriends());
	}, [dispatch]);

	return (
		<div className='main-container'>
			<div>
				{friends.map(({id, friend_id, friend_image, friend_name, balance}, index) => (
					<Friend key={`friend${index}`} username={friend_name} balance={balance} id={id} friendId={friend_id} image={friend_image}/>
				))}
			</div>
			{!friends.length && <EmptyFriendsTab />}
		</div>
	);
};

export default FriendsTab;
