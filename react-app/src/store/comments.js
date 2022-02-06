// constants
const LOAD_COMMENTS = "comments/LOAD_COMMENTS";
const DELETE_COMMENT = "comments/REMOVE_COMMENT";
const ADD_COMMENT = "comments/ADD_COMMENT";
const UPDATE_COMMENT = "comments/UPDATE_COMMENT";
const loadComments = (comments) => ({
	type: LOAD_COMMENTS,
	comments,
});

const removeComment = () => ({
	type: DELETE_COMMENT,
});

const addComment = (comment) => ({
	type: ADD_COMMENT,
	comment,
});

const updateComment = (comment) => ({
	type: UPDATE_COMMENT,
	comment,
});

export const getComments = (billId) => async (dispatch) => {
	console.log(billId);
	const res = await fetch(`/api/comments/bills/${billId}`);
	const data = await res.json();
	console.log(data);
	if (data.message) {
		return;
	} else {
		dispatch(loadComments(data));
	}
};
export const deleteComment = (id) => async (dispatch) => {
	const res = await fetch(`/api/comments/${id}`, { method: "DELETE" });
};
export const editComment = (id, message) => async (dispatch) => {
	const res = await fetch(`/api/comments/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(message),
	});
	const data = await res.json();
	console.log(data);
};
export const createComment = (billId, message) => async (dispatch) => {
	const res = await fetch(`/api/comments/bills/${billId}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			billId,
			message,
		}),
	});
	const data = await res.json();
	if (res.ok) {
		console.log(data);
		dispatch(addComment(data));
		return;
	} else if (res.status < 500) {
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

// const initialState = { comments: [] };
const initialState = { comments: {} };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ADD_COMMENT: {
			const newState = { ...state };
			console.log(action.comment.bill_id);
			if (newState.comments[action.comment.bill_id]) {
				newState.comments[action.comment.bill_id].push(action.comment);
			} else {
				newState.comments[action.comment.bill_id] = action.comment;
			}
			console.log(
				JSON.stringify(
					newState.comments[action.comment.bill_id],
					null,
					4
				)
			);
			return newState;
		}
		// case DELETE_COMMENT: {
		// 	return;
		// }
		// case UPDATE_COMMENT: {
		// 	return;
		// }
		case LOAD_COMMENTS: {
			const newState = { ...state };
			// console.log("ACTION", action);
			// const billIds = Object.keys(action.comments);
			// newState.comments = billIds.forEach((id) => {
			// 	if (newState.comments[id]) {
			// 		id += action.comments[id];
			// 	} else id = action.comments[id];
			// });
			newState.comments = { ...newState.comments, ...action.comments };
			// newState.comments = action.comments.reduce((comments, comment) => {
			// 	console.log(comment);
			// 	comments[comment.id] = comment;
			// 	return comments;
			// }, {});
			console.log(newState.comments);
			return newState;
		}
		default: {
			return state;
		}
	}
}
