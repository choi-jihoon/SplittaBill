import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddBillForm from './AddBillForm';

function AddBillFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button
          id='add-bill'
          onClick={() => setShowModal(true)}>
          Add Bill
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <AddBillForm showModal={setShowModal} />
          </Modal>
        )}
      </>
    );
  }

  export default AddBillFormModal;
