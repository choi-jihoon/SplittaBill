import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditBillForm from "./EditBillForm";

function EditBillFormModal({ bill }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button id="edit-bill" onClick={() => setShowModal(true)}>
				<i className="fas fa-edit edit-bill-icon"></i>
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditBillForm showModal={setShowModal} bill={bill} />
				</Modal>
			)}
		</>
	);
}

export default EditBillFormModal;
