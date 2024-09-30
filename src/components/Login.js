import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import { signInWithGooglePopup, createUserDocFromAuth, auth } from '../utilities/firebase.js';
import { signInWithEmailAndPassword, sendEmailVerification, onAuthStateChanged, signOut } from 'firebase/auth';

const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocFromAuth(user);
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState('');

    // Handle user authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                if (!user.emailVerified) {
                    alert('Please verify your email to access the application.');
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            alert('Verification email sent again! Please check your inbox.');
                        });
                }
            } else {
                setCurrentUser(null);
            }
        });
        return unsubscribe; // Cleanup the listener on unmount
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            if (user && !user.emailVerified) {
                alert('Your email is not verified. Please check your inbox for the verification email.');
                sendEmailVerification(user);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSignOut = async () => {
        await signOut(auth);
        setCurrentUser(null);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                {!currentUser ? (
                    <>
                        <div className="signup-link">
                            <Link to="/signup">Sign up</Link>
                        </div>
                        <h2>Login</h2>
                        {error && <p className="error-message">{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>Your email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>Your password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="login-button">Login</button>
                            <button
                                type="button"
                                onClick={logGoogleUser}
                                className="google-button"
                            >
                                Login with Google
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <h2>Welcome, {currentUser.email}</h2>
                        <button
                            type="button"
                            onClick={handleSignOut}
                            className="logout-button"
                        >
                            Sign Out
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login;
