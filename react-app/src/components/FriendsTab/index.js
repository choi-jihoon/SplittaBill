import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Friend from "../Friend"
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

			{friends.map(({friend_name, balance}, index) => (
				<Friend key={`friend${index}`} username={friend_name} balance={balance}/>
			))}

		</div>
	);
};

export default FriendsTab;
