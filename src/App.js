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
import Chat from './components/Chat';  // Import the Chat component
import Messaging from './components/Messages';  // Import the Messaging component


const App = () => {
  return (
    <Router>
      <Navbar /> {/* Your Navbar */}
      <ImageHeader /> {/* Image header for your app */}
      <Routes>
        <Route path="/" element={
          <div className="content">
            <FeaturedArticles />
            <FeaturedTutorials />
            <Messaging /> {/* Messaging component added to homepage */}
            <Subscription />
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<Chat />} /> {/* Chat page */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
