import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteBillForm from "./DeleteBillForm";

function DeleteBillModal({ billId, handleClick }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button id="delete-bill" onClick={(e) => {
				setShowModal(true)
				handleClick(e)
				}}>
				<i className="fas fa-trash delete-bill-icon"></i>
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<DeleteBillForm showModal={setShowModal} billId={billId} />
				</Modal>
			)}
		</>
	);
}

export default DeleteBillModal;
