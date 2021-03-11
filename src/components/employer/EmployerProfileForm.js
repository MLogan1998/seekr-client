import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storage } from '../firebaseConfig';

import { UserContext } from '../auth/UserProvider'
import { EmployerContext } from './EmployerProvider'


export const EmployerProfileForm = (props) => {
  const { createEmployerProfile } = useContext(EmployerContext)
  const { user, updateUser, getUserById } = useContext(UserContext)
  const [ employerImgUrl, setEmployerImgUrl] = useState(false)
  const [ employerImage, setEmployerImage] = useState(null)
  const [ currentEmployer, setCurrentEmployer] = useState({
    user: "",
    profileImg: ""
  })

  const userId = localStorage.getItem("user_id")

  useEffect(() => {
    getUserById(userId)
  }, [])


  const handleEmployerImage = (e) => {
    e.preventDefault()
    const file = e.target.files[0];
    setEmployerImgUrl(false)
    setEmployerImage(file);
  }

  const employerImgUpload = (e) => {
    const newEmployerProfileState = Object.assign({}, currentEmployer)
    const uploadTask = storage.ref(`employerprofile/${employerImage.name}`).put(employerImage)
    uploadTask.on(
      "state_changed", 
      () => {
        storage
          .ref("/employerprofile")
          .child(employerImage.name)
          .getDownloadURL()
          .then(url => {
            newEmployerProfileState['profileImg'] = url
            setCurrentEmployer(newEmployerProfileState)
            setEmployerImgUrl(true)
          })
      }
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createEmployerProfile({
      user: parseInt(userId),
      profile_img: currentEmployer.profileImg,
    })
    .then(() => updateUser({
      user: parseInt(userId),
      is_seeker: user.is_seeker,
      has_company: user.has_company,
      has_profile: true,
      has_listing: user.has_listing,
      first_name: user.first_name,
      last_name: user.last_name
    }))
    .then(() => props.history.push("/home"))
  }


  return (
    <div className="profile__container">
      <h1 className="list__heading--text mbl">Add Profile Image</h1>
      <div className="profile__form">
        <form className="form" autoComplete="off" onSubmit={handleSubmit}>
          <div className="form__group">
            <div className="form__image__input">
              <input name="projectImg" type="file" className="form__input" placeholder="Profile Image" required onChange={handleEmployerImage}></input>
              { employerImage && employerImgUrl ? <i class="far fa-check-circle"></i> : employerImage ? <i class="fas fa-upload fa-upload-red" onClick={employerImgUpload}></i> : ''}
            </div>
          <label htmlFor="projectImg" className="form__label">Project Screenshot</label>
          </div>
          <button className="button__primary mtl" type="submit">Add Profile &rarr;</button>
        </form>
      </div>
    </div>
  )
}
