import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../utilities/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import '../styles/Signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Clear previous errors
        try {
            // Try to create the user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Send email verification
            await sendEmailVerification(user);
            alert('Verification email sent! Please check your inbox.');

            // Navigate to the login page
            navigate('/login');
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setError('This email is already registered. Please log in instead.');
            } else if (err.code === 'auth/too-many-requests') {
                setError('Too many requests. Please wait before trying again.');
            } else {
                setError(err.message);
            }
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Sign Up</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="signup-button">
                        Sign Up
                    </button>
                </form>
                <Link to="/login">Already have an account? Log in</Link>
            </div>
        </div>
    );
};

export default Signup;
