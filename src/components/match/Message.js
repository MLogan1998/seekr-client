/* eslint-disable arrow-body-style */
import React from 'react';

export const Message = (props) => {
  const userId = localStorage.getItem('user_id');
  const messageClass = userId === props.msg.uid ? 'sent' : 'recieved';

  return (
    <div className={`message ${messageClass}`}>
    <p className="message__text">{props.msg.content}</p>
    </div>
  );
};
