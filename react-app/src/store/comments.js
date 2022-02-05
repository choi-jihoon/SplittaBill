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

const updateComment = (comment) => ({});

export const getComments = (billId) => async (dispatch) => {
	const res = await fetch(`/api/comments/bills/${billId}`);
	const data = await res.json();
	console.log({ data });
	dispatch(loadComments(data.comments));
};
// export const deleteComment = () => async (dispatch) => {};
// export const editComment = () => async (dispatch) => {};
// export const createComment = () => async (dispatch) => {};

const initialState = { comments: [] };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		// case ADD_COMMENT: {
		// 	return;
		// }
		// case DELETE_COMMENT: {
		// 	return;
		// }
		// case UPDATE_COMMENT: {
		// 	return;
		// }
		case LOAD_COMMENTS: {
			const newState = { ...state };
			newState.comments = action.comments.reduce((comments, comment) => {
				comments[comment.id] = comment;
				return comments;
			}, {});
			console.log(newState.comments);
			return newState;
		}
		default: {
			return state;
		}
	}
}
