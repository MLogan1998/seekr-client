import React, { useState } from 'react';

export const EmployerContext = React.createContext()

export const EmployerProvider = props => {
  const [ employer, setEmployer ] = useState({})
  const [ listings, setListings ] = useState({})


  const createEmployerProfile = profile => {
    return fetch('http://localhost:8000/employerprofile', {
        method: 'POST',
        headers: {
        "Authorization": `Token ${localStorage.getItem("s_token")}`,
        'Content-Type': 'application/json',
        "Accept": "application/json",
        },
        body: JSON.stringify(profile)
    })
        .then(response => response.json())
  }

  const getEmployerByUserId = (id) => {
    return fetch(`http://localhost:8000/employerprofile?user=${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("s_token")}`
        }
    })
    .then(response => response.json())
    .then(setEmployer)
}


  const createCompanyProfile = company => {
    return fetch('http://localhost:8000/company', {
        method: 'POST',
        headers: {
        "Authorization": `Token ${localStorage.getItem("s_token")}`,
        'Content-Type': 'application/json',
        "Accept": "application/json",
        },
        body: JSON.stringify(company)
    })
        .then(response => response.json())
  }

  const createJobListing = joblisting => {
    return fetch('http://localhost:8000/joblisting', {
        method: 'POST',
        headers: {
        "Authorization": `Token ${localStorage.getItem("s_token")}`,
        'Content-Type': 'application/json',
        "Accept": "application/json",
        },
        body: JSON.stringify(joblisting).replace(/:[ ]*"(true|false)"/g,':$1' )
    })
        .then(response => response.json())
  }

  const getJobListings = (id) => {
    return fetch('http://localhost:8000/joblisting', {
        headers: {
            "Authorization": `Token ${localStorage.getItem("s_token")}`
        }
    })
    .then(response => response.json())
    .then(setListings)
}


  return (
         <EmployerContext.Provider value={{ createEmployerProfile, employer, getEmployerByUserId, createCompanyProfile, createJobListing, listings, getJobListings }}>
            {props.children}
         </EmployerContext.Provider>
  )
}
