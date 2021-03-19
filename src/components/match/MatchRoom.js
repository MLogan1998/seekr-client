import React, {
  useRef,
  useState,
  useContext,
} from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firebaseConfig } from '../firebaseConfig';
import { Message } from './Message';

export const MatchRoom = (props) => {
  const [currentMessage, setCurrentMessage] = useState('');

  const userId = localStorage.getItem('user_id');

  const handleFormData = (e) => {
    setCurrentMessage(e.target.value);
  };

  const firestore = firebase.firestore();

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
  const { matchId } = props.match.params;
  const messagesRef = firestore.collection(`matchroom-${matchId}`);
  const query = messagesRef.orderBy('createdAt');

  const [messages] = useCollectionData(query, { idField: 'id' });

  const sendMessage = async (e) => {
    await messagesRef.add({
      content: currentMessage,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: userId,
    });
    setCurrentMessage('');
    scrollToEnd();
  };

  const endOfFeed = useRef();
  const scrollToEnd = () => {
    endOfFeed.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="chat">
      <div className="chat__messages">
        {messages && messages.map((msg) => <Message msg={msg} key={msg.id}/>)}
        <div ref={endOfFeed}></div>
      </div>

        <form className="chat__input" onSubmit={sendMessage}>
          <textarea name="message" rows="4" className="chat__input--text" onChange={(e) => { handleFormData(e); }} value={currentMessage}></textarea>
          <i className="far fa-paper-plane fa-2x chat__input--icon" onClick={sendMessage}></i>
        </form>
    </div>
  );
};
