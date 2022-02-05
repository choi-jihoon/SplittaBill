import React from "react";

const Comment = (comment) => {
	comment = comment?.comment;
	return (
		<div>
			<div>{comment?.message}</div>
			<div>{comment?.username}</div>
			<div>{comment?.created_at}</div>
		</div>
	);
};

export default Comment;
