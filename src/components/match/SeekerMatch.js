/* eslint-disable arrow-body-style */
import React, { useContext, useEffect } from 'react';
import { ProfileContext } from '../profile/ProfileProvider';
import { SeekerMatchCard } from './SeekerMatchCard';

export const SeekerMatch = (props) => {
  const {
    seeker,
    getSeekerByUserId,
    getSeekerMatches,
    matches,
  } = useContext(ProfileContext);

  const userId = localStorage.getItem('user_id');
  const seekerProfileId = seeker && seeker.results ? seeker.results[0].id : '';

  useEffect(() => {
    getSeekerByUserId(userId);
  }, []);

  useEffect(() => {
    if (seeker && seeker.results && !matches.results) {
      getSeekerMatches(seekerProfileId);
    }
  }, [seeker]);

  const matchCards = matches && matches.results ? matches.results.map((match) => (<SeekerMatchCard key={match.id} match={match} />)) : '';

  return (
    <div className="match__container">
      <h1 className="list__main__heading">Matches</h1>
      { matchCards }
    </div>
  );
};
