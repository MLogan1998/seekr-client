/* eslint-disable arrow-body-style */
import React, { useContext, useEffect } from 'react';
import { ProfileContext } from '../profile/ProfileProvider';
import { firestore } from '../firebaseConfig';

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

  return (
    <h1>SeekerMatch</h1>
  );
};
