import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersFriends } from "../../../store/friends";
import DeleteCommentFormModal from "./DeleteCommentFormModal";
import EditCommentFormModal from "./EditCommentFormModal";

const Comment = ({ comment }) => {
	const dispatch = useDispatch();
	const curr_user = useSelector((state) => state.session.user);
	const [display, setDisplay] = useState(false);
	const friendsById = useSelector((state) => state.friends.byId);
	const friends = Object.values(friendsById);
	console.log(friendsById);
	console.log(friends);
	const image = friendsById[comment.user_id]?.image
		? friendsById[comment.user_id]?.image
		: "https://splitabill.s3.us-east-2.amazonaws.com/f395dfcdb332496bb5700cc328339e5d.png";
	useEffect(() => {
		dispatch(getUsersFriends());
	}, [dispatch]);
	return (
		<div
			className="comment-user-image-container"
			onMouseEnter={() => setDisplay(true)}
			onMouseLeave={() => setDisplay(false)}
		>
			<div className="comment-container">
				{curr_user.id === comment?.user_id && (
					<div className="edit-delete-wrapper">
						<EditCommentFormModal comment={comment} />
						<DeleteCommentFormModal
							comment={comment}
							display={display}
						/>
					</div>
				)}
				<div className="comment-message">{comment?.message}</div>
			</div>
			<div className="comment-pic-div">
				<img src={image} alt="friend-pic" className="friend-pic"></img>
			</div>
		</div>
	);
};

export default Comment;
