import React, { useState } from 'react';

export const UserContext = React.createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState({});

  const getUserById = (id) => (
    fetch(`http://localhost:8000/user/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('s_token')}`,
      },
    })
      .then((response) => response.json())
      .then(setUser)
  );

  const updateUser = (newUser) => (
    fetch(`http://localhost:8000/user/${newUser.user}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(setUser)
  );

  return (
    <UserContext.Provider value={{ user, getUserById, updateUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
