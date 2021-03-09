import React, { useState } from 'react';

export const EmployerContext = React.createContext()

export const EmployerProvider = props => {
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


  return (
         <EmployerContext.Provider value={{ createEmployerProfile }}>
            {props.children}
         </EmployerContext.Provider>
  )
}
