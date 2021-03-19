/* eslint-disable arrow-body-style */
import React, { useEffect, useContext } from 'react';
import { EmployerContext } from '../employer/EmployerProvider';
import { EmployerMatchCard } from './EmployerMatchCard';

export const EmployerMatch = (props) => {
  const {
    matches,
    employer,
    getEmployerByUserId,
    getEmployerMatches,
  } = useContext(EmployerContext);

  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    getEmployerByUserId(userId);
  }, []);

  const employerProfileId = employer && employer.results ? employer.results[0].id : '';

  useEffect(() => {
    if (employer && employer.results && !matches.results) {
      getEmployerMatches(employerProfileId);
    }
  }, [employer]);

  const matchCards = matches && matches.results ? matches.results.map((match) => (<EmployerMatchCard key={match.id} match={match} />)) : '';

  return (
    <div className="match__container">
      <h1 className="list__main__heading">Matches</h1>
      { matchCards }
    </div>
  );
};
