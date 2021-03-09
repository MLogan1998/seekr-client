import React, { useState, useContext } from 'react';
import { storage } from '../firebaseConfig';

import { EmployerContext } from './EmployerProvider'


export const EmployerProfileForm = (props) => {
  const { createEmployerProfile} = useContext(EmployerContext)
  const [ employerImgUrl, setEmployerImgUrl] = useState(false)
  const [ employerImage, setEmployerImage] = useState(null)
  const [ currentEmployer, setCurrentEmployer] = useState({
    user: "",
    profileImg: ""
  })

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

  const userId = localStorage.getItem("user_id")

  const handleSubmit = (e) => {
    e.preventDefault()
    createEmployerProfile({
      user: parseInt(userId),
      profile_img: currentEmployer.profileImg,
    })
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
          <button className="button__primary mtl" type="submit">Add Company &rarr;</button>
        </form>
      </div>
    </div>
  )
}