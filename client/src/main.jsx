import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { SearchProvider } from './contexts/SearchContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider> {/* DARK MODE CONTEXT */}
    <SearchProvider> {/* SEARCH VALUE CONTEXT */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SearchProvider>
  </ThemeProvider>
);
