import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import { AuthProvider } from './utilities/AuthProvider'; // Import your AuthProvider

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap the entire App in AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
