import React, { useState, useEffect } from 'react';
import { auth, db } from '../utilities/firebase'; 
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import '../styles/Messages.css';

const Messaging = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Listen for authentication changes
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setCurrentUser(user); // Set the current authenticated user
    });

    // Fetch messages from Firestore in real-time
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));
    const unsubscribeMessages = onSnapshot(q, (querySnapshot) => {
      let messagesList = [];
      querySnapshot.forEach((doc) => {
        messagesList.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messagesList);
    });

    return () => {
      unsubscribeAuth();  // Unsubscribe from auth listener on unmount
      unsubscribeMessages();  // Unsubscribe from messages listener on unmount
    };
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      console.error('No authenticated user. Please log in to send messages.');
      return;
    }
    if (message.trim() === '') return;

    const { uid, displayName } = currentUser;
    try {
      await addDoc(collection(db, 'messages'), {
        text: message,
        uid,
        displayName,
        createdAt: new Date(),
      });
      setMessage(''); // Clear input after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="messaging-container">
      <header className="messaging-header">
        <h2>Secure Messaging</h2>
        <p>Communicate with other DEV@Deakin users in real-time. Messages sent here are visible to all authenticated users.</p>
      </header>

      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.uid === currentUser?.uid ? 'sent' : 'received'}`}>
            <strong>{msg.displayName}</strong>: {msg.text}
          </div>
        ))}
      </div>

      {currentUser ? (
        <form onSubmit={sendMessage} className="message-form">
          <input
            type="text"
            placeholder="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      ) : (
        <p>Please log in to send messages.</p>
      )}
    </div>
  );
};

export default Messaging;

