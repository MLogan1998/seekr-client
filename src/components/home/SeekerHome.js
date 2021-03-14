import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../auth/UserProvider';

export const SeekerHome = (props) => {
  const { user, getUserById } = useContext(UserContext);

  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    getUserById(userId);
  }, []);

  return (
      <div className="list">
        <h1 className="list__main__heading">
          <span className="list__main__heading--span">What now?</span>
        </h1>
        <div className="list__item">
          <div className="list__heading">
          {user.has_profile
            ? <div className="list__heading--circles list__heading--numbers">1</div>
            : <div className="list__heading--circle list__heading--number">1</div>
            }
            <h1 className="list__heading--text">Create Profile</h1>
          </div>
          <div className="list__text-container">
            <p className="list__description">Show employers your best work! Seekr is designed for employers to match with you based on your work, experience, and code.
            { user.has_profile ? '' : <Link className="list__item--link" to="/profile" >Add Your Profile &rarr;</Link>}</p>
          </div>
        </div>
        <div className="list__item">
          <div className="list__heading">
            <div className="list__heading--circle list__heading--number">2</div>
            <h1 className="list__heading--text">Start Swiping</h1>
          </div>
          <div className="list-text-container">
            <p className="list__description">Let the search begin! Start swiping through employers. Swipe right if you think the company is a great fit.</p>
          </div>
        </div>
        <div className="list__item">
          <div className="list__heading">
            <div className="list__heading--circle list__heading--number">3</div>
            <h1 className="list__heading--text">Match</h1>
          </div>
          <div className="list-text-container">
            <p className="list__description">Whoohoo! Seekr will let you know when you have matched with an employer, and you can begin communicating with them.</p>
          </div>
        </div>
        { user.has_profile ? <Link className="list__link" to="/seekerswipe">start swiping &rarr;</Link> : '' }
      </div>
  );
};
