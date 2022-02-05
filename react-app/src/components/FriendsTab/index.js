import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Friend from "./Friend"
import { getUsersFriends } from "../../store/friends";

const FriendsTab = (props) => {
	const dispatch = useDispatch();
	const friendsById = useSelector(state => state.friends.byId);
	const friends = Object.values(friendsById);

	useEffect(() => {
		dispatch(getUsersFriends());
	}, [dispatch]);

	return (
		<div>
			<div>FriendsTab</div>
			<ul>
				{friends.map(({friend_name, balance}, index) => (
					<li key={`friend-${index}`}>
						{friend_name} {balance}
					</li>
				))}
			</ul>
		</div>
	);
};

export default FriendsTab;
