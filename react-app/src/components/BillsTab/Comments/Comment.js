import React from "react";
import { useSelector } from "react-redux";
import DeleteCommentFormModal from "./DeleteCommentFormModal";
import EditCommentFormModal from "./EditCommentFormModal";

const Comment = ({ comment }) => {
	const curr_user = useSelector((state) => state.session.user);
	return (
		<div
			style={{
				border: "1px solid black",
				margin: 10,
				width: "fit-content",
				padding: 8,
			}}
		>
			<div>Message: {comment?.message}</div>
			<div>Posted by: {comment?.username}</div>
			<div>Posted at: {comment?.created_at}</div>
			{curr_user.id === comment?.user_id && (
				<>
					<EditCommentFormModal comment={comment} />
					<DeleteCommentFormModal comment={comment} />
				</>
			)}
		</div>
	);
};

export default Comment;
