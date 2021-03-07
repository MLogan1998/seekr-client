import React, { useEffect, useContext } from 'react';
import { ProfileContext } from './ProfileProvider';

export const ProfileForm = () => {
  const { languages, getLanguages } = useContext(ProfileContext)


  useEffect(() => {
    getLanguages()
  }, [])

  const languageSelect = languages && languages.results ? languages.results.map((language => 
    <div className="check__container">
      <input id={language.name} type="checkbox" className="form__input-checks" ></input>
      <label htmlFor={language.name}><span class="flaticon-py"></span></label>
    </div>
    )) : ''


  return (
    <div className="profile__container">
      <h1 className="list__heading--text margin-bottom-small">Create Profile</h1>
      <div className="profile__form">
        <form className="form" autoComplete="off" >
          <div className="form__group">
            <input id="gitHubUser" type="text" className="form__input form__input-profile" placeholder="GitHub Username" required></input>
            <label htmlFor="gitHubUser" className="form__label">GitHub Username</label>
          </div>
          <div className="form__group">
            <input id="projectName" type="text" className="form__input form__input-profile" placeholder="Featured Project Name" required></input>
            <label htmlFor="projectName" className="form__label">Featured Project Name</label>
          </div>
          <div className="form__group">
              <textarea id="pdes" rows="6" className="form__input form__input-profile" placeholder="Project Description (Max 300 Characters)" required></textarea>
              <label htmlFor="pdes" className="form__label">Project Description</label>
          </div>
          <div className="form__group">
              <input id="pimg" rows="6" type="file" className="form__input form__input-profile" placeholder="Project Description (Max 300 Characters)" required></input>
              <label htmlFor="pimg" className="form__label">Project Screenshot</label>
          </div>
          <div className="form__group">
              <textarea id="code" rows="6" className="form__input form__input-profile" placeholder="What do you love about coding? (Max 300 Characters)" required></textarea>
              <label htmlFor="code" className="form__label">Personal Story</label>
          </div>
          <div className="form__group">
              <input id="teched" type="text" className="form__input form__input-profile" placeholder="Technical Education" required></input>
              <label htmlFor="teched" className="form__label">Technical Education</label>
          </div>
          <div className="check__group form__group">
              {languageSelect}
          </div>
        </form>
      </div>
    </div>
  )
}
