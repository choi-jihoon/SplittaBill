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


	let image;

	if (comment.user_image) image = comment.user_image;
	else image = "https://splitabill.s3.us-east-2.amazonaws.com/f395dfcdb332496bb5700cc328339e5d.png";

	image = comment.user_image;

	// if (friendsById[comment.user_id]?.image) {
	// 	image = friendsById[comment.user_id]?.image;
	// } else if (comment.user_id === curr_user.id) {
	// 	image = curr_user.image
	// 		? curr_user.image
	// 		: "https://splitabill.s3.us-east-2.amazonaws.com/f395dfcdb332496bb5700cc328339e5d.png";
	// }
	useEffect(() => {
		dispatch(getUsersFriends());
	}, [dispatch]);
	return (
		<div
			className="comment-user-image-container"
			onMouseEnter={() => setDisplay(true)}
			onMouseLeave={() => setDisplay(false)}
		>
			{curr_user.id === comment?.user_id && (
				<DeleteCommentFormModal comment={comment} display={display} />
			)}
			<div className="comment-container">
				{curr_user.id === comment?.user_id && (
					<div className="edit-delete-wrapper">
						<EditCommentFormModal comment={comment} />
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
