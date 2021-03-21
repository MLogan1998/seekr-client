import React from 'react';
import Modal from 'react-bootstrap/Modal';

export const ListingModal = (props) => (
  (
    <Modal show={props.modalShow} onHide={() => props.handleModalClose(props.listing.id) } className="modal" centered>
      <Modal.Body className="modal__body">
        <i className="fas fa-times modal__close" onClick={() => props.handleModalClose(props.listing.id) }></i>
        <div className="listing__section listing__section--company">
            <div className="listing__section--heading">
              <h1 className="modal__heading">{props.listing.company.company_name}</h1>
            </div>
            <p className="project__info--description">{props.listing.company.company_bio}</p>
        </div>
        <div className="listing__section listing__section--job">
            <div className="listing__section--heading">
              <h1 className="modal__heading">{props.listing.job_title}</h1>
            </div>
            <div className="modal__content">
              <h4 className="modal__content--title">Job Description</h4><p className="project__info--description">{props.listing.job_description}</p>
            </div>
            <div className="modal__content">
              <h4 className="modal__content--title">Requiremnts</h4><p className="project__info--description">{props.listing.requirements}</p>
            </div>
            <div className="modal__content">
              <h4 className="modal__content--title">Salary</h4><p className="project__info--description">${props.listing.salary}</p>
            </div>
            <div className="modal__content">
              <h4 className="modal__content--title">Benefits</h4>{ props.listing.benefits ? <p className="project__info--description"> Yes</p> : <p className="project__info--description">Not Offered</p>}
            </div>
        </div>
      </Modal.Body>
    </Modal>
  )
);
