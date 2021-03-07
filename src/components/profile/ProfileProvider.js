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

  return (
         <ProfileContext.Provider value={{ languages, getLanguages }}>
            {props.children}
         </ProfileContext.Provider>
  )
}
