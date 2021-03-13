import React, { useEffect, useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { ProfileContext } from '../profile/ProfileProvider';
import moment from 'moment';

export const SeekerModal = (props) => {
  const { getGitHubData, gitHubData } = useContext(ProfileContext)

  
  const languageSelect = props.profile && props.profile.languages ? props.profile.languages.map((language => 
      <span className={language.icon} key={language.id}></span>
    )) : ''


  const gitHubActivity = gitHubData ? gitHubData.map((event =>{
    if (event.type === "PullRequestEvent") {
      const formattedDate = moment(event.created_at).format('MMMM Do, YYYY');
      return <div className="github__action">
                <a href={event.payload.pull_request.html_url} target="_blank" rel="noopener noreferrer"><p className="github__action--item">{event.payload.pull_request.head.repo.name} <i class="fas fa-external-link-alt"></i></p></a>
                <p className="github__action--item">{formattedDate}</p>
            </div>
    }
  })) : ''


 return (
    <Modal show={props.modalShow} onHide={() => props.handleModalClose(props.profile.id) } className="modal" centered>
      <Modal.Body className="modal__body">
        <i className="fas fa-times modal__close" onClick={() => props.handleModalClose(props.profile.id) }></i>
        <div className="listing__section listing__section--seeker">
            <div className="listing__section--heading">
              <h1 className="modal__heading">About</h1>
            </div>
            <p className="project__info--description">{props.profile.bio}</p>
        </div>
        <div className="listing__section listing__section--seeker">
            <div className="listing__section--heading">
              <h1 className="modal__heading">Education</h1>
            </div>
            <p className="project__info--description">{props.profile.tech_ed}</p>
        </div>
        <div className="listing__section listing__section--seeker">
            <div className="listing__section--heading">
              <h1 className="modal__heading">Technologies</h1>
            </div>
            <div className="tech__container">
            {languageSelect}
            </div>       
        </div>
        <div className="listing__section listing__section--seeker">
            <div className="listing__section--heading">
              <h1 className="modal__heading">Recent Pull Requests</h1>
            </div>
            {gitHubActivity}

        </div>
      </Modal.Body>
    </Modal>
 )
}
