import React from 'react';
import { Input, Button } from 'semantic-ui-react';
import '../styles/Subscription.css';


const Subscription = () => (
    <div className="subscription-container">
      <h1 className="subscription-title">SIGN UP FOR OUR DAILY INSIDER</h1>
      <div className="subscription-form">
        <Input icon="mail" iconPosition="left" placeholder="Enter your email" />
        <Button color="darkcyan">Subscribe</Button>
      </div>
    </div>
  );

export default Subscription;
