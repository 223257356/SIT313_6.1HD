import React, { useState } from 'react';
import { Input, Button, Message } from 'semantic-ui-react';
import axios from 'axios';
import '../styles/Subscription.css';

const Subscription = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async () => {
    if (!email) {
      setError('Please enter an email address');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post('http://localhost:3001/api/subscribe', { email });
      setMessage(response.data.message);
      setEmail('');
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="subscription-container">
      <h1 className="subscription-title">SIGN UP FOR OUR DAILY INSIDER</h1>
      <div className="subscription-form">
        <Input
          icon="mail"
          iconPosition="left"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          color="darkcyan"
          onClick={handleSubscribe}
          loading={loading}
          disabled={loading}
        >
          Subscribe
        </Button>
      </div>
      {message && <Message positive>{message}</Message>}
      {error && <Message negative>{error}</Message>}
    </div>
  );
};

export default Subscription;
