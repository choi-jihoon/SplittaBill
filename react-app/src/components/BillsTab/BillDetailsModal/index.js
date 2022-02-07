import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import BillDetails from './BillDetails';

function BillDetailsModal({ bill }) {
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
            <BillDetails showModal={setShowModal} bill={bill} />
          </Modal>
        )}
      </>
    );
  }

  export default BillDetailsModal;
