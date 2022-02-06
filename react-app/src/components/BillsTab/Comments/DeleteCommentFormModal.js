import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import DeleteCommentForm from "./DeleteCommentForm";

function DeleteCommentFormModal({ commentId }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button id="delete-comment" onClick={() => setShowModal(true)}>
				Delete
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<DeleteCommentForm
						setShowModal={setShowModal}
						commentId={commentId}
					/>
				</Modal>
			)}
		</>
	);
}

export default DeleteCommentFormModal;
