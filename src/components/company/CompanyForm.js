import React from 'react';



export const CompanyForm = (props) => {
  return (
    <div className="profile__container">
      <h1 className="list__heading--text mbl">Add Company</h1>
      <div className="profile__form">
        <form className="form" autoComplete="off">
          <div className="form__group">
            <input name="gitHubUser" type="text" className="form__input form__input-profile" placeholder="GitHub Username"required></input>
            <label htmlFor="gitHubUser" className="form__label">GitHub Username</label>
          </div>
        </form>
      </div>
    </div>
  )
}
