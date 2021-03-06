import React, { useState } from 'react';

export const EmployerContext = React.createContext();

export const EmployerProvider = (props) => {
  const [employer, setEmployer] = useState({});
  const [company, setCompany] = useState({});
  const [listings, setListings] = useState({});
  const [listing, setListing] = useState({});
  const [matches, setMatches] = useState({});

  const createEmployerProfile = (profile) => (
    fetch('http://localhost:8000/employerprofile', {
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

  const getEmployerByUserId = (id) => (
    fetch(`http://localhost:8000/employerprofile?user=${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('s_token')}`,
      },
    })
      .then((response) => response.json())
      .then(setEmployer)
  );

  const getCompanyByEmployerId = (id) => (
    fetch(`http://localhost:8000/company?employer_profile=${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('s_token')}`,
      },
    })
      .then((response) => response.json())
      .then(setCompany)
  );

  const createCompanyProfile = (newCompany) => (
    fetch('http://localhost:8000/company', {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('s_token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(newCompany),
    })
      .then((response) => response.json())
  );

  const createJobListing = (joblisting) => (
    fetch('http://localhost:8000/joblisting', {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('s_token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(joblisting).replace(/:[ ]*"(true|false)"/g, ':$1'),
    })
      .then((response) => response.json())
  );

  const getJobListings = (seeker) => (
    fetch(`http://localhost:8000/joblisting?seeker=${seeker}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('s_token')}`,
      },
    })
      .then((response) => response.json())
      .then(setListings)
  );

  const createEmployerAction = (action) => (
    fetch('http://localhost:8000/employeraction', {
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

  const getListingByEmployerId = (employerId) => (
    fetch(`http://localhost:8000/joblisting?employer=${employerId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('s_token')}`,
      },
    })
      .then((response) => response.json())
      .then(setListing)
  );

  const getEmployerMatches = (currentEmployer) => (
    fetch(`http://localhost:8000/match?employer=${currentEmployer}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('s_token')}`,
      },
    })
      .then((response) => response.json())
      .then(setMatches)
  );

  return (
         <EmployerContext.Provider value={
             {
               createEmployerProfile,
               employer,
               getEmployerByUserId,
               createCompanyProfile,
               createJobListing,
               listings,
               getJobListings,
               getCompanyByEmployerId,
               company,
               createEmployerAction,
               getListingByEmployerId,
               listing,
               matches,
               getEmployerMatches,
             }}>
            {props.children}
         </EmployerContext.Provider>
  );
};
