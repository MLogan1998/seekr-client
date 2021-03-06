import React from 'react';
import { Link } from 'react-router-dom'

export const NavBar = (props) => {

  const onClickEvent = () => {
    const navButtons = document.getElementById("navi-toggle");
    navButtons.checked = false;
  }

  const handleLogOut = () => {
    localStorage.removeItem("s_token")
    localStorage.removeItem("user_id")
    localStorage.removeItem("seekr")
    props.history.push({ pathname: "/login" })
  }

  return (
      <div class="navigation">
        <input id="navi-toggle" type="checkbox" class="navigation__checkbox"></input>
        <label for="navi-toggle" class="navigation__button">
            <span class="navigation__icon">&nbsp;</span>
        </label>
        <div class="navigation__background">&nbsp;</div>
          <nav class="navigation__nav">
              <ul class="navigation__list">
                  <li class="navigation__item"><a href="/home" class="navigation__link" onClick={onClickEvent}>Home</a></li>
                  <li class="navigation__item"><a href="#" class="navigation__link" onClick={onClickEvent}>Swipe</a></li>
                  <li class="navigation__item"><a href="#" class="navigation__link" onClick={onClickEvent}>Matches</a></li>
                  <li class="navigation__item"><Link to="/register" class="navigation__link" onClick={handleLogOut}>Log Out</Link></li>
              </ul>
          </nav>
        </div>
  )
}
