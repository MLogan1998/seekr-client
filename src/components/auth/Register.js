import React, { useState } from 'react';

export const Register = (props) => {
  const [seekr, setSeekr] = useState();

  const firstName = React.createRef();
  const lastName = React.createRef();
  const email = React.createRef();
  const password = React.createRef();
  const isSeeker = React.createRef();
  const confirmPassword = React.createRef();
  const passwordDialog = React.createRef();

  const handleRadio = (e) => {
    setSeekr(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === confirmPassword.current.value) {
      const newUser = {
        username: email.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        is_seeker: seekr,
      };
      return fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(newUser).replace(/:[ ]*"(true|false)"/g, ':$1'),
      })
        .then((res) => res.json())
        .then((res) => {
          if ('token' in res) {
            localStorage.setItem('s_token', res.token);
            localStorage.setItem('user_id', res.user_id);
            localStorage.setItem('seekr', res.is_seeker);
            props.history.push('/home');
          }
        });
    }
    return passwordDialog.current.showModal();
  };

  return (
<>
    <dialog className="dialog dialog--password" ref={passwordDialog}>
      <div>Passwords don't match</div>
      <button className="button__primary" onClick={(e) => passwordDialog.current.close()}>Close</button>
    </dialog>

    <div className="login__container">
      <div className="heading__container">
        <h1 className="heading__primary">seekr</h1>
        <p className="heading__slogan">swipe then hire</p>
      </div>
      <div className="login__form">
        <form className="form" autoComplete="off" onSubmit={handleRegister}>
          <div className="form__group">
            <input ref={firstName} id="firstName" type="text" className="form__input" placeholder="First Name" required></input>
            <label htmlFor="firstName" className="form__label">First Name</label>
          </div>
          <div className="form__group">
            <input ref={lastName} id="lastName" type="text" className="form__input" placeholder="Last Name" required></input>
            <label htmlFor="lastName" className="form__label">Last Name</label>
          </div>
          <div className="form__group">
            <input ref={email} id="email" type="email" className="form__input" placeholder="Email Address" required></input>
            <label htmlFor="email" className="form__label">Email Address</label>
          </div>
          <div className="form__group">
            <input ref={password} id="password" type="password" className="form__input" placeholder="Password" required></input>
            <label htmlFor="password" className="form__label">Password</label>
          </div>
          <div className="form__group">
            <input ref={confirmPassword} id="confirmPassword" type="password" className="form__input" placeholder="Confirm Password" required></input>
            <label htmlFor="password" className="form__label">Confirm Password</label>
          </div>
          <div className="form__group radio__container" ref={isSeeker}>
            <div className="form__radio-group">
                <input id="small" type="radio" className="form__radio-input" name="size" value={true} onChange={handleRadio} />
                <label htmlFor="small" className="form__radio-label mrs">
                    <span className="form__radio-button"></span>
                    Seeker
                </label>
            </div>
            <div className="form__radio-group u-margin-bottom-4">
                <input id="large" type="radio" className="form__radio-input" name="size" value={false} onChange={handleRadio} />
                <label htmlFor="large" className="form__radio-label">
                    <span className="form__radio-button"></span>
                    Employer
                </label>
            </div>
          </div>
          <button className="button__primary" type="submit">Register &rarr;</button>
        </form>
      </div>
    </div>
    </>
  );
};
