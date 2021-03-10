import React, { useState } from 'react';

export const EmployerContext = React.createContext()

export const EmployerProvider = props => {
  const [ employer, setEmployer ] = useState({})


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


  return (
         <EmployerContext.Provider value={{ createEmployerProfile, employer, getEmployerByUserId }}>
            {props.children}
         </EmployerContext.Provider>
  )
}
