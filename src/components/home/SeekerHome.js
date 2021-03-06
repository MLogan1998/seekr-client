import React from "react";
import { Link } from 'react-router-dom'

export const SeekerHome = props => {
  return (
      <div className="list">
        <h1 className="list__main__heading">
          <span className="list__main__heading--span">What now?</span>
        </h1>
        <div className="list__item">
          <div className="list__heading">
            <div className="list__heading--circle list__heading--number">1</div>
            <h1 className="list__heading--text">Create Your Profile</h1>
          </div>
          <div className="list__text-container">
            <p className="list__description">Show employers your best work! Seekr is designed for employers to match with you based only on your work, experience, and code.</p>
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
        <Link className="list__link" to="/swipe">Get Started &rarr;</Link>
      </div>
  )
} 
