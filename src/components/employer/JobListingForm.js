import React, { useState, useContext, useEffect } from 'react';
import { EmployerContext } from './EmployerProvider'
import { UserContext } from '../auth/UserProvider'

export const JobListingForm = (props) => {
  const benefits = React.createRef()
  const [ bennies, setBennies ] = useState()
  const { user, updateUser, getUserById } = useContext(UserContext)
  const { employer, getEmployerByUserId, createJobListing } = useContext(EmployerContext)
  const [ currentJob, setCurrentJob] = useState({
    jobTitle: "",
    jobDescription: "",
    requirements: "",
    salary: "",
  })

  const userId = localStorage.getItem("user_id")

  useEffect(() => {
    getUserById(userId)
  }, [])

  useEffect(() => {
    getEmployerByUserId(userId)
  }, [])

  const employerProfileId = employer && employer.results ? employer.results[0].id : ''

  const handleRadio = (e) => {
    setBennies(e.target.value)
  }

  const handleControlledInputChange = (event) => {
    const newJobListing = Object.assign({}, currentJob)
    newJobListing[event.target.name] = event.target.value
    setCurrentJob(newJobListing)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createJobListing({
      employer: employerProfileId,
      job_description: currentJob.jobDescription,
      salary: currentJob.salary,
      benefits: bennies,
      requirements: currentJob.requirements,
      job_title: currentJob.jobTitle
    })
    .then(() => updateUser({
      user: parseInt(userId),
      is_seeker: user.is_seeker,
      has_company: user.has_company,
      has_profile: user.has_profile,
      has_listing: true,
      first_name: user.first_name,
      last_name: user.last_name
    }))
    .then(() => props.history.push("/home"))
  }


  return (
    <div className="profile__container">
      <h1 className="list__heading--text mbl">Add Job Listing</h1>
      <div className="profile__form">
        <form className="form" autoComplete="off" onSubmit={handleSubmit}>
          <div className="form__group">
            <input name="jobTitle" type="text" className="form__input form__input-profile" placeholder="Job Title" onChange={handleControlledInputChange} required></input>
            <label htmlFor="jobTitle" className="form__label">Job Title</label>
          </div>
          <div className="form__group">
              <textarea name="jobDescription" rows="6" className="form__input form__input-profile" placeholder="Job Description (Max 300 Characters)" onChange={handleControlledInputChange}  required></textarea>
              <label htmlFor="jobDescription" className="form__label">Job Description</label>
          </div>
          <div className="form__group">
              <textarea name="requirements" rows="6" className="form__input form__input-profile" placeholder="Requirements (Max 300 Characters)" onChange={handleControlledInputChange}  required></textarea>
              <label htmlFor="requirements" className="form__label">Requirements</label>
          </div>
          <div className="form__group radio__container"  ref={benefits}> 
            <div className="form__radio-group">
                <input id="small" type="radio" className="form__radio-input" name="bennies" value={true} onChange={handleRadio}/>
                <label htmlFor="small" className="form__radio-label mrl">
                    <span className="form__radio-button"></span>
                    Benefits
                </label>
            </div>
            <div className="form__radio-group u-margin-bottom-4">
                <input id="large" type="radio" className="form__radio-input" name="bennies" value={false} onChange={handleRadio}/>
                <label htmlFor="large" className="form__radio-label">
                    <span className="form__radio-button"></span>
                    Not Offered
                </label>
            </div>
          </div>
          <div className="form__group">
            <input name="salary" type="text" className="form__input form__input-profile" placeholder="Salary" onChange={handleControlledInputChange} required></input>
            <label htmlFor="salary" className="form__label">Salary</label>
          </div>
          <button className="button__primary mtl" type="submit">Create Job Listing &rarr;</button>
        </form>
      </div>
    </div>
  )
}
