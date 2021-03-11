import React, { useState, useContext, useEffect } from 'react';
import { storage } from '../firebaseConfig';
import { EmployerContext } from './EmployerProvider'
import { UserContext } from '../auth/UserProvider'

export const CompanyForm = (props) => {
  const { employer, getEmployerByUserId, createCompanyProfile} = useContext(EmployerContext)
  const { user, updateUser, getUserById } = useContext(UserContext)
  const [ companyImageUrl, setCompanyImageUrl] = useState(false)
  const [ companyImage, setCompanyImage] = useState(null)
  const [ currentCompany, setCurrentCompany] = useState({
    employerProfile: "",
    companyName: "",
    companyLogo: "",
    companyBio: "",
  })

  
  const userId = localStorage.getItem("user_id")

  useEffect(() => {
    getUserById(userId)
  }, [])

  useEffect(() => {
    getEmployerByUserId(userId)
  }, [])

  const employerProfileId = employer && employer.results ? employer.results[0].id : ''


  const handleCompanyImage = (e) => {
    e.preventDefault()
    const file = e.target.files[0];
    setCompanyImageUrl(false)
    setCompanyImage(file);
  }

  const handleControlledInputChange = (event) => {
    const newCompanyProfileState = Object.assign({}, currentCompany)
    newCompanyProfileState[event.target.name] = event.target.value
    setCurrentCompany(newCompanyProfileState)
  }

  
  const handleSubmit = (e) => {
    e.preventDefault()
    createCompanyProfile({
      employer_profile: employerProfileId,
      company_name: currentCompany.companyName,
      company_logo: currentCompany.companyLogo,
      company_bio: currentCompany.companyBio

    })
    .then(() => updateUser({
      user: parseInt(userId),
      is_seeker: user.is_seeker,
      has_company: true,
      has_profile: user.has_profile,
      has_listing: user.has_listing,
      first_name: user.first_name,
      last_name: user.last_name
    }))
    .then(() => props.history.push("/home"))
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
        <form className="form" autoComplete="off" onSubmit={handleSubmit}>
          <div className="form__group">
            <input name="companyName" type="text" className="form__input form__input-profile" placeholder="Company Name" onChange={handleControlledInputChange} required></input>
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
              <textarea name="companyBio" rows="6" className="form__input form__input-profile" placeholder="Company Bio (Max 300 Characters)" onChange={handleControlledInputChange} required></textarea>
              <label htmlFor="companyBio" className="form__label">Company Bio</label>
          </div>
          <button className="button__primary mtl" type="submit">Add Company &rarr;</button>
        </form>
      </div>
    </div>
  )
}
