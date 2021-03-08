import React, { useState } from 'react';

export const ProfileContext = React.createContext()

export const ProfileProvider = props=> {
  const [ languages, setLanguages ] = useState([]);

  const getLanguages = () => {
    return fetch("http://localhost:8000/languages", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("s_token")}`
      }
    })
      .then(res => res.json())
      .then(setLanguages)
  }

  const createProfile = profile => {
    return fetch('http://localhost:8000/profile', {
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
         <ProfileContext.Provider value={{ languages, getLanguages, createProfile }}>
            {props.children}
         </ProfileContext.Provider>
  )
}
