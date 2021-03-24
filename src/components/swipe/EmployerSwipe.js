import React, {
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import TinderCard from 'react-tinder-card';
import { SeekerModal } from './SeekerModal';
import { ProfileContext } from '../profile/ProfileProvider';
import { EmployerContext } from '../employer/EmployerProvider';

export const EmployerSwipe = (props) => {
  const { profiles, getProfiles, getGitHubData } = useContext(ProfileContext);
  const {
    createEmployerAction,
    employer,
    getEmployerByUserId,
    listing,
    getListingByEmployerId,
  } = useContext(EmployerContext);

  const [modalShow, setModalShow] = useState(false);
  const [listingId, setListingId] = useState(null);
  const listingRef = useRef();
  listingRef.current = listingId;

  useEffect(() => {
    if (employer && employer.results && !profiles.results) {
      getProfiles(employerProfileId);
    }
  }, [employer]);

  useEffect(() => {
    if (employer && employer.results && !listing.results) {
      getListingByEmployerId(employerProfileId);
    }
  }, [employer]);

  useEffect(() => {
    getEmployerByUserId(userId);
  }, []);

  useEffect(() => {
    if (listing && listing.results && !listingId) {
      setListingId(listing.results[0].id);
    }
  }, [listing]);

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

  const userId = localStorage.getItem('user_id');
  const employerProfileId = employer && employer.results ? employer.results[0].id : '';

  const notify = () => toast.success('You just matched!', {
    position: 'bottom-center',
    autoClose: 1600,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const employerMatch = (match) => (
    fetch('http://localhost:8000/match/employermatch', {
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
      <h1 className="swipe__heading">swipe</h1>
      <div className="cardContainer">

          {
            profiles && profiles.results && profiles.results.length > 0
              ? profiles.results.map(((profile) => <TinderCard className="swipeCard" key={profile.id} preventSwipe={['up', 'down']} onSwipe={(direction) => {
                if (direction === 'right') {
                  createEmployerAction({
                    employer: employerProfileId,
                    employer_response: true,
                    seeker: profile.id,
                    job: listingRef.current,
                  })
                    .then(() => employerMatch({
                      employer: employerProfileId,
                      seeker: profile.id,
                      job: listingRef.current,
                      employer_response: true,
                    }));
                } if (direction === 'left') {
                  createEmployerAction({
                    employer: employerProfileId,
                    employer_response: false,
                    seeker: profile.id,
                    job: listingId,
                  });
                }
              }}>
                    <div id="card" className="swipeCard__content">
                      <div className="swipeCard__content--img" style={{ backgroundImage: `url(${profile.project_img})` }}></div>
                    <div className="project__info">
                      <div className="project__info--circle" onClick={() => handleModalShow(profile.id)}><i className="fas fa-info"></i></div>
                      <h3 className="project__info--name">{profile.project_name}<a href={profile.project_url} target="_blank" rel="noopener noreferrer"><i className="fas fa-external-link-alt mls card-link-alt"></i></a></h3>
                      <p className="project__info--description">{profile.project_detail}</p>
                    </div>
                    <SeekerModal key={profile.id} handleModalShow={handleModalShow} handleModalClose={handleModalClose} modalShow={profile.modalShow} profile={profile} />
                    </div>
                  </TinderCard>
              ))
              : <div className="noResults">
              <i className="far fa-sad-cry noResults__icon mbl"></i>
              <p className="project__info--description">There are no seekers at this time.</p>
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
