import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import TinderCard from 'react-tinder-card';
import { ListingModal } from './ListingModal';
import { EmployerContext } from '../employer/EmployerProvider';
import { ProfileContext } from '../profile/ProfileProvider';

export const SeekerSwipe = (props) => {
  const { listings, getJobListings } = useContext(EmployerContext);
  const [modalShow, setModalShow] = useState(false);
  const {
    seeker,
    getSeekerByUserId,
    createSeekerAction,
  } = useContext(ProfileContext);

  const userId = localStorage.getItem('user_id');
  const seekerProfileId = seeker && seeker.results ? seeker.results[0].id : '';

  useEffect(() => {
    if (seeker && seeker.results && !listings.results) {
      getJobListings(seekerProfileId);
    }
  }, [seeker]);

  useEffect(() => {
    getSeekerByUserId(userId);
  }, []);

  const handleModalShow = (listingId) => {
    if (listings && listings.results) {
      const listing = listings.results.find(({ id }) => id === listingId);
      listing.modalShow = true;
      setModalShow(listing.modalShow);
    }
  };

  const handleModalClose = (listingId) => {
    if (listings && listings.results) {
      const listing = listings.results.find(({ id }) => id === listingId);
      listing.modalShow = false;
      setModalShow(listing.modalShow);
    }
  };

  const notify = () => toast.success('You just matched!', {
    position: 'bottom-center',
    autoClose: 1600,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const seekerMatch = (match) => (
    fetch('http://localhost:8000/match/seekermatch', {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('s_token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(match).replace(/:[ ]*"(true|false)"/g, ':$1'),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.created === false) {
          notify();
        }
      })
  );

  return (
    <div>
      <div className="cardContainer">
          {
            listings && listings.results && listings.results.length > 0
              ? listings.results.map(((listing) => <TinderCard className="swipeCard" key={listing.id} preventSwipe={['up', 'down']} onSwipe={(direction) => {
                if (direction === 'right') {
                  createSeekerAction({
                    seeker: seekerProfileId,
                    seeker_response: true,
                    job: listing.id,
                  })
                    .then(() => seekerMatch({
                      seeker: seekerProfileId,
                      job: listing.id,
                      seeker_response: true,
                    }));
                } if (direction === 'left') {
                  createSeekerAction({
                    seeker: seekerProfileId,
                    seeker_response: false,
                    job: listing.id,
                  });
                }
              }}>
                    <div id="card" className="swipeCard__content">
                      <div className="swipeCard__content--img" style={{ backgroundImage: `url(${listing.employer.profile_img})` }}></div>
                    <div className="project__info">
                      <div className="project__info--circle" onClick={() => handleModalShow(listing.id)}><i class="fas fa-info"></i></div>
                      <h3 className="project__info--name">{listing.job_title}</h3>
                      <p className="project__info--description">{listing.job_description}</p>
                    </div>
                    <ListingModal key={listing.id} handleModalShow={handleModalShow} handleModalClose={handleModalClose} modalShow={listing.modalShow} listing={listing} />
                    </div>
                  </TinderCard>
              ))
              : <div className="noResults">
                <i class="far fa-sad-cry noResults__icon mbl"></i>
                <p className="project__info--description">There are no openings at this time.</p>
              </div>
          }
          </div>
          <ToastContainer
              position="bottom-center"
              autoClose={1400}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
          />
    </div>
  );
};
