import React from "react"
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';



export const Login = props => {
  return (
    <div className="login__container">
      <div className="heading__container">
        <h1 className="heading__primary">seekr</h1>
        <p className="heading__slogan">swipe then hire</p>
      </div>
      <div className="login__form">
        <form className="form" autoComplete="off">
          <div className="form__group">
            <input id="email" type="email" className="form__input" placeholder="Email Address" required></input>
            <label htmlFor="email" className="form__label">Email Address</label>
          </div>
          <div className="form__group">
            <input id="password" type="password" className="form__input" placeholder="Password" required></input>
            <label htmlFor="password" className="form__label">Password</label>
          </div>
          <Link buttonvariant="link" id="btn-text2">Login</Link>
        </form>
        <Link className="login__link" to="/register">Not a member yet?</Link>
      </div>
    </div>
  )
} 
