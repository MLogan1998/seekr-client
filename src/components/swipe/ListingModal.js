import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const ListingModal = (props) => {
 return (
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
              <p className="project__info--description"><span className="modal__content--title">Job Description: </span>{props.listing.job_description}</p>
            </div>
            <div className="modal__content">
              <p className="project__info--description"><span className="modal__content--title">Requiremnts: </span>{props.listing.requirements}</p>
            </div>
            <div className="modal__content">
              <p className="project__info--description"><span className="modal__content--title">Salary: </span>${props.listing.salary}</p>
            </div>
            <div className="modal__content">
              <p className="project__info--description modal__bennies"><span className="modal__content--title">Benefits: </span>{ props.listing.benefits ? <p className="project__info--description"> Yes</p> : <p className="project__info--description">Not Offered</p>}</p>
            </div>
        </div>
      </Modal.Body>
    </Modal>
 )
}
