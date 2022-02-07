import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import ExpenseBillDetails from './ExpenseBillDetails';

function ExpenseBillDetailsModal({ expense }) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button
          id='bill-details'
          onClick={() => setShowModal(true)}>
          See Bill Details
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <ExpenseBillDetails showModal={setShowModal} expense={expense} />
          </Modal>
        )}
      </>
    );
  }

  export default ExpenseBillDetailsModal;
