import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ConsultProvider } from './context/ConsultContext';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import './styles/style.css';
import './styles/admin.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ContentProvider>
          <ConsultProvider>
            <App />
          </ConsultProvider>
        </ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
