import React from 'react';
import '../styles/PricingPlan.css'; // Ensure you create this CSS file

const PricingPlan = () => {
  return (
    <div className="pricing-container">
      <h2>Pricing Plans</h2>
      {/* Free Plan */}
      <div className="plan free-plan">
        <h3>Free Plan</h3>
        <ul>
          <li>Access basic tutorials and articles</li>
          <li>Limited posting and messaging capabilities</li>
        </ul>
      </div>

      {/* Premium Plan */}
      <div className="plan premium-plan">
        <h3>Premium Plan</h3>
        <ul>
          <li>Unlimited access to all tutorials and articles</li>
          <li>Unlimited posting and advanced messaging features</li>
          <li>Priority support and additional customisations</li>
        </ul>
        <a
          href="https://buy.stripe.com/test_8wM3cwfh1dn3208bII"
          target="_blank"
          rel="noopener noreferrer"
          className="pay-button"
        >
          Pay for Premium Plan
        </a>
      </div>
    </div>
  );
};

export default PricingPlan;
