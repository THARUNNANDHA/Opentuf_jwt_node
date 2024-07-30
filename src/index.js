import React from 'react';
import ReactDOM from 'react-dom/client';
import "./assets/css/index.css";
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import '@fortawesome/fontawesome-free/css/all.min.css';
{/* <script src="https://kit.fontawesome.com/e3d1f6e2b9.js" crossorigin="anonymous"></script> */ }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="31706794484-59jdeslin0devcrcrvgjv88p1sb1uhjm.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode >
);
