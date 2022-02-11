import React, { useState } from "react";

import { Modal } from "../../../../../../../../context/Modal";
import EditCommentForm from "./EditCommentForm";

function EditCommentFormModal({ comment }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button id="edit-comment" onClick={() => setShowModal(true)}>
				<i className="fas fa-pen edit-comment-icon"></i>
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditCommentForm
						showModal={setShowModal}
						comment={comment}
					/>
				</Modal>
			)}
		</>
	);
}

export default EditCommentFormModal;
