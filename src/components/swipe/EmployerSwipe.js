import React, { useContext, useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import { SeekerModal } from './SeekerModal';
import { ProfileContext } from '../profile/ProfileProvider';
import { EmployerContext } from '../employer/EmployerProvider';

export const EmployerSwipe = (props) => {
  const { profiles, getProfiles, getGitHubData } = useContext(ProfileContext);
  const { createEmployerAction, employer, getEmployerByUserId } = useContext(EmployerContext);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    getProfiles();
  }, []);

  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    getEmployerByUserId(userId);
  }, []);

  const employerProfileId = employer && employer.results ? employer.results[0].id : '';

  const handleModalShow = (profileId) => {
    if (profiles && profiles.results) {
      const profile = profiles.results.find(({ id }) => id === profileId);
      getGitHubData(profile.github_username);
      profile.modalShow = true;
      setModalShow(profile.modalShow);
    }
  };

  const handleModalClose = (profileId) => {
    if (profiles && profiles.results) {
      const profile = profiles.results.find(({ id }) => id === profileId);
      profile.modalShow = false;
      setModalShow(profile.modalShow);
    }
  };

  return (
    <div>
      <div className="cardContainer">
          {
            profiles && profiles.results
              ? profiles.results.map(((profile) => <TinderCard className="swipeCard" key={profile.id} preventSwipe={['up', 'down']} onSwipe={(direction) => {
                if (direction === 'right') {
                  createEmployerAction({
                    employer: employerProfileId,
                    employer_response: true,
                    seeker: profile.id,
                  });
                } if (direction === 'left') {
                  createEmployerAction({
                    employer: employerProfileId,
                    employer_response: false,
                    seeker: profile.id,
                  });
                }
              }}>
                    <div id="card" className="swipeCard__content">
                      <div className="swipeCard__content--img" style={{ backgroundImage: `url(${profile.project_img})` }}></div>
                    <div className="project__info">
                      <div className="project__info--circle" onClick={() => handleModalShow(profile.id)}><i class="fas fa-info"></i></div>
                      <h3 className="project__info--name">{profile.project_name}</h3>
                      <p className="project__info--description">{profile.project_detail}</p>
                    </div>
                    <SeekerModal key={profile.id} handleModalShow={handleModalShow} handleModalClose={handleModalClose} modalShow={profile.modalShow} profile={profile} />
                    </div>
                  </TinderCard>
              ))
              : ''
          }
          </div>
    </div>
  );
};
