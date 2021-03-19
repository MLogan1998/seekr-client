/* eslint-disable arrow-body-style */

import React from 'react';
import { Link } from 'react-router-dom';

export const SeekerMatchCard = (props) => {
  const roomId = props.match.id;
  const matchRoomLink = `/matchroom/${roomId}`;
  return (
    <div className="match">
      <div className = "match__header">
        <img className="match__header--avatar" src={props.match.employer.profile_img} alt="avatar"></img>
        <div className="match__details">
          <h5 className="match__details--text">You matched with {props.match.employer.user.first_name} {props.match.employer.user.first_name}!</h5>
          <Link className="match__details--link" to={matchRoomLink}>Chat<i class="fas fa-comments mls"></i></Link>
        </div>
      </div>
    </div>
  );
};
