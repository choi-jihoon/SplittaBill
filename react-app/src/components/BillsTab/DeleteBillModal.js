import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteBillForm from './DeleteBillForm';

function DeleteBillModal({ billId }) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button
          id='delete-bill'
          onClick={() => setShowModal(true)}>
          Delete Bill
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
