import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = (props) => {
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
                  <li className="navigation__item"><a href="/swipe" className="navigation__link" onClick={onClickEvent}>Swipe</a></li>
                  <li className="navigation__item"><a href="/swipe" className="navigation__link" onClick={onClickEvent}>Matches</a></li>
                  <li className="navigation__item"><Link to="/register" className="navigation__link" onClick={handleLogOut}>Log Out</Link></li>
              </ul>
          </nav>
        </div>
  );
};
