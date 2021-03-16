import React, { useState } from 'react';
import apiKeys from './apiKeys.json';

export const ProfileContext = React.createContext();

export const ProfileProvider = (props) => {
  const [languages, setLanguages] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [gitHubData, setGitHubData] = useState([]);
  const [seeker, setSeeker] = useState({});

  const getLanguages = () => (
    fetch('http://localhost:8000/languages', {
      headers: {
        Authorization: `Token ${localStorage.getItem('s_token')}`,
      },
    })
      .then((res) => res.json())
      .then(setLanguages)
  );

  const createProfile = (profile) => (
    fetch('http://localhost:8000/profile', {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('s_token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(profile),
    })
      .then((response) => response.json())
  );

  const getProfiles = (employer) => (
    fetch(`http://localhost:8000/profile?employer=${employer}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('s_token')}`,
      },
    })
      .then((response) => response.json())
      .then(setProfiles)
  );

  const gitHubToken = apiKeys.github.apiKey;

  const getGitHubData = (profile) => (
    fetch(`https://api.github.com/users/${profile}/events?per_page=20`, {
      headers: {
        Accept: 'application/json',
        Authorization: `token ${gitHubToken}`,
      },
    })
      .then((response) => response.json())
      .then(setGitHubData)
  );

  const getSeekerByUserId = (userId) => (
    fetch(`http://localhost:8000/profile?user=${userId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('s_token')}`,
      },
    })
      .then((response) => response.json())
      .then(setSeeker)
  );

  const createSeekerAction = (action) => (
    fetch('http://localhost:8000/seekeraction', {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('s_token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(action).replace(/:[ ]*"(true|false)"/g, ':$1'),
    })
      .then((response) => response.json())
  );

  const seekerMatch = (match) => (
    fetch('http://localhost:8000/match/seekermatch', {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('s_token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(match).replace(/:[ ]*"(true|false)"/g, ':$1'),
    })
      .then((response) => response.json())
  );

  return (
         <ProfileContext.Provider value={{
           languages,
           getLanguages,
           createProfile,
           profiles,
           getProfiles,
           getGitHubData,
           gitHubData,
           seeker,
           getSeekerByUserId,
           createSeekerAction,
           seekerMatch,
         }}>
            {props.children}
         </ProfileContext.Provider>
  );
};
