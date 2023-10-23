import React, { useRef, useState ,  useEffect,} from 'react';
import axios from 'axios';
import { initializeApp } from "firebase/app";
import { getAuth, } from "firebase/auth";
import { getFirestore, collection, query as dbQuery, where, orderBy, limit, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyAOMYONHuV6hMmfVUnoEadnALvnx6Qo2nU",
  authDomain: "test-2ac5c.firebaseapp.com",
  projectId: "test-2ac5c",
  storageBucket: "test-2ac5c.appspot.com",
  messagingSenderId: "778611722689",
  appId: "1:778611722689:web:bc9f17677f476aa27d4740",
  measurementId: "G-CS0VJQ19NY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">

      <section>
        <ChatRoom /> 
      </section>
    </div>
  );
}


function ChatRoom() {
  const { userId, matchUserId } = useParams();

  const dummy = useRef();
  const messagesRef = collection(firestore, 'messages');
  const query = dbQuery(messagesRef, orderBy('createdAt'), limit(25));

  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/findUser/${userId}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  const sendMessage = async (e) => {
    e.preventDefault();

    
    const messageData = {
      text: formValue,
      createdAt: serverTimestamp(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      profilePicture: userData?.profileImage || 'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png',
    };

    await addDoc(messagesRef, messageData);

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <main>
      <form onSubmit={sendMessage}>
        
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
        <button type="submit" disabled={!formValue}>🕊️</button>
      </form>
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      <span ref={dummy}></span>
    </main>
  )
}

function ChatMessage(props) {
  const { text, uid, profilePicture, firstName, lastName } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={profilePicture || 'https://api.adorable.io/avatars/23/abott@adorable.png'} className='profilePic' />
      <h1>{firstName} {lastName}</h1>
      <p>{text}</p>
    </div>
  )
}

export default App;