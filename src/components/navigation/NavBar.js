import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../auth/UserProvider';

export const NavBar = (props) => {
  const { user, getUserById } = useContext(UserContext);
  const [userType, setUserType] = useState();

  useEffect(() => {
    const isSeekr = localStorage.getItem('seekr');
    setUserType(isSeekr);
  }, []);

  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    getUserById(userId);
  }, []);

  const onClickEvent = () => {
    const navButtons = document.getElementById('navi-toggle');
    navButtons.checked = false;
  };

  const handleLogOut = () => {
    localStorage.removeItem('s_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('seekr');
    props.history.push({ pathname: '/login' });
  };

  return (
      <div className="navigation">
        <input id="navi-toggle" type="checkbox" className="navigation__checkbox"></input>
        <label htmlFor="navi-toggle" className="navigation__button">
            <span className="navigation__icon">&nbsp;</span>
        </label>
        <div className="navigation__background">&nbsp;</div>
          <nav className="navigation__nav">
              <ul className="navigation__list">
                  <li className="navigation__item"><a href="/home" className="navigation__link" onClick={onClickEvent}>Home</a></li>
                  {
                  user && user.has_listing && userType === 'true' ? <div>
                        <li className="navigation__item"><a href="/seekerswipe" className="navigation__link" onClick={onClickEvent}>Swipe</a></li>
                        <li className="navigation__item"><a href="/seekermatch" className="navigation__link" onClick={onClickEvent}>Matches</a></li>
                      </div>
                    : user && user.has_listing && userType === 'false' ? <div>
                          <li className="navigation__item"><a href="/employerswipe" className="navigation__link" onClick={onClickEvent}>Swipe</a></li>
                          <li className="navigation__item"><a href="/employermatch" className="navigation__link" onClick={onClickEvent}>Matches</a></li>
                        </div>
                      : ''
                   }

                  <li className="navigation__item"><Link to="/register" className="navigation__link" onClick={handleLogOut}>Log Out</Link></li>
              </ul>
          </nav>
        </div>
  );
};
