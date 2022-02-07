import React, { useState } from 'react';
import ExpenseBillDetails from './ExpenseBillDetails'
import { Modal } from '../../../context/Modal';


function ExpenseBillDetailsModal({ expense }) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button
          id='bill-details'
          onClick={() => setShowModal(true)}>
          See Bill Details <i className="fas fa-search-dollar"></i>
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
