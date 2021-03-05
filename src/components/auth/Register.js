import React from "react"
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';



export const Register = props => {
  return (
    <div className="login__container">
      <div className="heading__container">
        <h1 className="heading__primary">seekr</h1>
        <p className="heading__slogan">swipe then hire</p>
      </div>
      <div className="login__form">
        <form className="form" autoComplete="off">
          <div className="form__group">
            <input id="fullname" type="text" className="form__input" placeholder="Full Name" required></input>
            <label htmlFor="" className="form__label">Full Name</label>
          </div>
          <div className="form__group">
            <input id="email" type="email" className="form__input" placeholder="Email Address" required></input>
            <label htmlFor="email" className="form__label">Email Address</label>
          </div>
          <div className="form__group">
            <input id="password" type="password" className="form__input" placeholder="Password" required></input>
            <label htmlFor="password" className="form__label">Password</label>
          </div>
          <div className="form__group radio__container">
            <div className="form__radio-group">
                <input id="small" type="radio" className="form__radio-input" name="size" />
                <label for="small" className="form__radio-label">
                    <span className="form__radio-button"></span>
                    Seeker
                </label>
            </div>
            <div className="form__radio-group u-margin-bottom-4">
                <input id="large" type="radio" className="form__radio-input" name="size" />
                <label for="large" className="form__radio-label">
                    <span className="form__radio-button"></span>
                    Employer
                </label>
            </div>
          </div>
          <Link buttonvariant="link" id="btn-text2">Register</Link>
        </form>
      </div>
    </div>
  )
} 
