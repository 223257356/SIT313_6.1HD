import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ImageHeader from './components/ImageHeader';
import FeaturedArticles from './components/FeaturedArticles';
import FeaturedTutorials from './components/FeaturedTutorials';
import Subscription from './components/Subscription';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Chat from './components/Chat';
import Messaging from './components/Messages';
import PricingPlan from './components/PricingPlan'; // Import PricingPlans component
import PostComponent from './components/PostComponent'; // Import Post component

const App = () => {
  return (
    <Router>
      <Navbar />
      <ImageHeader />
      <Routes>
        <Route path="/" element={
          <div className="content">
            <FeaturedArticles />
            <FeaturedTutorials />
            <Messaging />
            <Subscription />
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/pricing" element={<PricingPlan />} /> {/* Add PricingPlans route */}
        <Route path="/posts" element={<PostComponent />} /> {/* Add PostComponent route */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
