import React from 'react';
import './LoginWithThirdPartyButton.css';

const LoginWithThirdPartyButton = ({imgStyle={}, icon, backgroundColor, children, onClick,width='100%',disabled=false }) => {
  return (
    <button 
      className="login-button" 
      style={{ backgroundColor,width }} 
      onClick={onClick}
      disabled={disabled}
    >
      <img src={icon} className="login-button-icon" style={imgStyle}/>
      <span className="login-button-text">{children}</span>
    </button>
  );
};

export default LoginWithThirdPartyButton;