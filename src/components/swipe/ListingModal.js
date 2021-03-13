import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const ListingModal = (props) => {
 return (
    <Modal show={props.modalShow} onHide={() => props.handleModalClose(props.listing.id) } className="modal" centered>
      <Modal.Body className="modal__body">
        <h1>{props.listing.job_title}</h1>
        <Button variant="primary" onClick={() => props.handleModalClose(props.listing.id) }>Update</Button>
      </Modal.Body>
    </Modal>
 )
}
