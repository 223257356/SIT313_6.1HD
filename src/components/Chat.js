import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Chat.css';

const Chat = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setError(null);  // Reset error before sending request
    setLoading(true); // Set loading state

    try {
      // API endpoint for the ChatGPT API
      const apiUrl = 'https://api.openai.com/v1/chat/completions';

      // Using environment variable for the API key
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      };

      const requestBody = {
        model: 'gpt-3.5-turbo', // or 'gpt-4' if you're using GPT-4
        messages: [{ role: 'user', content: input }],
        max_tokens: 150,
        temperature: 0.7,
      };

      const { data } = await axios.post(apiUrl, requestBody, { headers });

      setResponse(data.choices[0].message.content); // Adjust based on API response format
    } catch (error) {
      console.error('Error sending message:', error);
      setError('There was an error sending the message. Please try again.');
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="chatgpt-container"> {/* Apply the CSS class */}
      <h2>ChatGPT Integration</h2> {/* Apply styling from the CSS file */}

      <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="chat-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask ChatGPT a question"
          className="chat-input"
        />
        <button type="submit" disabled={loading} className="chat-button">
          {loading ? 'Loading...' : 'Send'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {response && (
        <div className="chat-response">
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Chat;
