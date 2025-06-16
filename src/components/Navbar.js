// MIT License
// Copyright (c) 2025 Nishant Sonar
//
// Permission is hereby granted, free of charge, to any person obtaining a copy...
// (add rest of license if desired, or just the first two lines as attribution)

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ isListening, toggleVoiceRecognition }) => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#2c3e50' }}>
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span className="me-2" style={{ fontSize: '1.5rem' }}>🎤</span>
          <span className="fw-bold">VoiceNav</span>
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/') ? 'active fw-bold text-info' : ''}`} 
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/dashboard') ? 'active fw-bold text-info' : ''}`} 
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/settings') ? 'active fw-bold text-info' : ''}`} 
                to="/settings"
              >
                Settings
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/profile') ? 'active fw-bold text-info' : ''}`} 
                to="/profile"
              >
                Profile
              </Link>
            </li>
          </ul>
          
          <button
            className={`btn btn-sm rounded-circle d-none d-lg-block ${isListening ? 'btn-danger' : 'btn-info'}`}
            onClick={toggleVoiceRecognition}
            aria-label={isListening ? "Stop voice recognition" : "Start voice recognition"}
            style={{ width: '40px', height: '40px' }}
          >
            <i className={`bi ${isListening ? 'bi-mic-mute' : 'bi-mic'}`}></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;