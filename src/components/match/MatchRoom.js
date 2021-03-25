import React, {
  useRef,
  useState,
  useContext,
  useEffect,
} from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firebaseConfig } from '../firebaseConfig';
import { Message } from './Message';
import { ProfileContext } from '../profile/ProfileProvider';

export const MatchRoom = (props) => {
  const { getMatchById, match } = useContext(ProfileContext);
  const [currentMessage, setCurrentMessage] = useState('');
  const [userType, setUserType] = useState();

  useEffect(() => {
    const isSeekr = localStorage.getItem('seekr');
    setUserType(isSeekr);
  }, []);

  const userId = localStorage.getItem('user_id');
  const { matchId } = props.match.params;

  useEffect(() => {
    getMatchById(matchId);
  }, []);

  const handleFormData = (e) => {
    setCurrentMessage(e.target.value);
  };

  const firestore = firebase.firestore();

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

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

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      sendMessage();
    }
  };

  const endOfFeed = useRef();
  const scrollToEnd = () => {
    endOfFeed.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="chat">
      <div className="chat__header">
      {
        match && match.employer && match.seeker ? userType === 'true'
          ? <><img src={match.employer.profile_img} alt="avatar" className="chat__header--avatar"></img><p className="chat__header--text">{match.employer.user.first_name} {match.employer.user.last_name}</p></>
          : <><img src={match.seeker.profile_img} alt="avatar" className="chat__header--avatar"></img><p className="chat__header--text">{match.seeker.user.first_name} {match.seeker.user.last_name}</p></>
          : ''
      }
      </div>
      <div className="chat__messages">
        {messages && messages.map((msg) => <Message msg={msg} key={msg.id}/>)}
      </div>
      <div ref={endOfFeed}></div>
        <form className="chat__input" onSubmit={sendMessage}>
          <textarea name="message" rows="3" className="chat__input--text" onChange={(e) => { handleFormData(e); }} onKeyDown={(e) => { handleEnter(e); }} value={currentMessage}></textarea>
          <i className="far fa-paper-plane fa-2x chat__input--icon" onClick={sendMessage}></i>
        </form>
    </div>
  );
};
