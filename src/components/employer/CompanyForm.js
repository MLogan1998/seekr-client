import React, { useState, useContext, useEffect } from 'react';
import { storage } from '../firebaseConfig';
import { EmployerContext } from './EmployerProvider'

export const CompanyForm = (props) => {
  const { employer, getEmployerByUserId } = useContext(EmployerContext)
  const [ companyImageUrl, setCompanyImageUrl] = useState(false)
  const [ companyImage, setCompanyImage] = useState(null)
  const [ currentCompany, setCurrentCompany] = useState({
    user: "",
    companyLogo: ""
  })

  
  const userId = localStorage.getItem("user_id")

  useEffect(() => {
    getEmployerByUserId(userId)
  }, [])

  const employerProfileId = employer && employer.results ? employer.results[0].id : ''

  console.log(employerProfileId)
  
  const handleCompanyImage = (e) => {
    e.preventDefault()
    const file = e.target.files[0];
    setCompanyImageUrl(false)
    setCompanyImage(file);
  }

  const companyImageUpload = (e) => {
    const newCompanyProfileState = Object.assign({}, currentCompany)
    const uploadTask = storage.ref(`company/${companyImage.name}`).put(companyImage)
    uploadTask.on(
      "state_changed", 
      () => {
        storage
          .ref("/company")
          .child(companyImage.name)
          .getDownloadURL()
          .then(url => {
            newCompanyProfileState['companyLogo'] = url
            setCurrentCompany(newCompanyProfileState)
            setCompanyImageUrl(true)
          })
      }
    )
  }


  return (
    <div className="profile__container">
      <h1 className="list__heading--text mbl">Add Company</h1>
      <div className="profile__form">
        <form className="form" autoComplete="off">
          <div className="form__group">
            <input name="companyName" type="text" className="form__input form__input-profile" placeholder="Company Name"required></input>
            <label htmlFor="companyName" className="form__label">Company Name</label>
          </div>
          <div className="form__group">
            <div className="form__image__input">
              <input name="companyLogo" type="file" className="form__input" placeholder="Profile Image" required onChange={handleCompanyImage}></input>
              {companyImage &&companyImageUrl ? <i class="far fa-check-circle"></i> :companyImage ? <i class="fas fa-upload fa-upload-red" onClick={companyImageUpload}></i> : ''}
            </div>
            <label htmlFor="companyLogo" className="form__label">Company Logo</label>
          </div>
          <div className="form__group">
              <textarea name="bio" rows="6" className="form__input form__input-profile" placeholder="Company Bio (Max 300 Characters)" required></textarea>
              <label htmlFor="bio" className="form__label">Company Bio</label>
          </div>
        </form>
      </div>
    </div>
  )
}
