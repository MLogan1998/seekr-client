import React, { useState } from 'react';


export const UserContext = React.createContext()

export const UserProvider = props => {
  const [user, setUser] = useState({})
  
  const getUserById = (id) => {
    return fetch(`http://localhost:8000/user/${id}`, {
     headers: {
       "Authorization": `Token ${localStorage.getItem("s_token")}`
     }
    })
   .then(response => response.json())
   .then(setUser)
 }

 const updateUser = user => {
  return fetch(`http://localhost:8000/user/${user.user}`, {
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
  })
      .then(setUser)
}


 return (
    <UserContext.Provider value={{ user, getUserById , updateUser }}>
      {props.children}
    </UserContext.Provider>
  )
}
