import React, { useEffect, useContext } from "react";
import { UserContext } from '../auth/UserProvider';
import { Link } from 'react-router-dom'

export const EmployerHome = props => {
  const { user, getUserById } = useContext(UserContext)

  const userId = localStorage.getItem("user_id")

  useEffect(() => {
    getUserById(userId)
  }, [])

  return (
      <div className="list">
        <h1 className="list__main__heading">
          <span className="list__main__heading--span">What now?</span>
        </h1>
        <div className="list__item">
          <div className="list__heading">
            {user.has_profile ? 
            <div className="list__heading--circles list__heading--numbers">1</div>
            :
            <div className="list__heading--circle list__heading--number">1</div>
            }
            <h1 className="list__heading--text">Create Profile</h1>
          </div>
          <div className="list-text-container">
            <p className="list__description">Create your profile. Your name and image will not be seen by seekers until you match!
            { user.has_profile? '' : <Link className="list__item--link" to="/employerprofile" >Add Your Profile &rarr;</Link>}
            </p>
          </div>
        </div>
        <div className="list__item">
          <div className="list__heading">
            <div className="list__heading--circle list__heading--number">2</div>
            <h1 className="list__heading--text">Your Company</h1>
          </div>
          <div className="list__text-container">
            <p className="list__description">Tell us a little about your company. Where are you located? What is your mission? What are your core values?
            { user.has_profile? <Link className="list__item--link" to="/company" >Add Your Profile &rarr;</Link> : ''}
            </p>
          </div>
        </div>
        <div className="list__item">
          <div className="list__heading">
            <div className="list__heading--circle list__heading--number">3</div>
            <h1 className="list__heading--text">Add Job Listing</h1>
          </div>
          <div className="list-text-container">
            <p className="list__description">Add your job listing to seekr. What are you looking for in a developer? Front-End? Back-End? Full Stack?</p>
          </div>
        </div>
        <div className="list__item">
          <div className="list__heading">
            <div className="list__heading--circle list__heading--number">4</div>
            <h1 className="list__heading--text">Start Swiping</h1>
          </div>
          <div className="list-text-container">
            <p className="list__description">Start swiping through job seekers. You will see their featured projects, GitHub stats, and technologies. Swipe right to match!</p>
          </div>
        </div>
        <div className="list__item">
          <div className="list__heading">
            <div className="list__heading--circle list__heading--number">5</div>
            <h1 className="list__heading--text">Match</h1>
          </div>
          <div className="list-text-container">
            <p className="list__description">Whoohoo! Seekr will let you know when you have matched with a job seeker, and you can begin communicating with them.</p>
          </div>
        </div>
      </div>
  )
} 
