import React, { useState } from "react"
import { Link } from 'react-router-dom'
// import Button from 'react-bootstrap/Button';



export const Login = props => {
  const [user, setUser] = useState({
    email:"",
    password:""
  })
  const passwordDialog = React.createRef()

  const handleControlledInputChange = (event) => {
    const newUserState = Object.assign({}, user)
    newUserState[event.target.id] = event.target.value
    setUser(newUserState)
}


  const handleLogin = (e) => {
    e.preventDefault();
    return fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify({
          username: user.email,
          password: user.password
      })
  })
      .then(res => res.json())
      .then(res => {
          if ("valid" in res && res.valid && "token" in res) {
              localStorage.setItem( "s_token", res.token )
              localStorage.setItem("user_id", res.user_id)
              localStorage.setItem("seekr", res.is_seeker)
              props.history.push("/home")
          }
          else {
            passwordDialog.current.showModal()
          }
      })
  }


  return (
    <>
    <dialog className="dialog dialog--password" ref={passwordDialog}>
      <div className="margin-bottom-small">Incorrect Passowrd</div>
      <button className="button__primary" onClick={e => passwordDialog.current.close()}>Close</button>
    </dialog>
    <div className="login__container">
      <div className="heading__container">
        <h1 className="heading__primary">seekr</h1>
        <p className="heading__slogan">swipe then hire</p>
      </div>
      <div className="login__form">
        <form className="form" autoComplete="off" onSubmit={handleLogin}>
          <div className="form__group">
            <input id="email" type="email" className="form__input" placeholder="Email Address" onChange={handleControlledInputChange} required></input>
            <label htmlFor="email" className="form__label">Email Address</label>
          </div>
          <div className="form__group">
            <input id="password" type="password" className="form__input" placeholder="Password" onChange={handleControlledInputChange} required></input>
            <label htmlFor="password" className="form__label">Password</label>
          </div>
          <button className="button__primary" type="submit">Login &rarr;</button>
        </form>
        <Link className="login__link" to="/register" >Not a member yet?</Link>
      </div>
    </div>
    </>
  )
} 
