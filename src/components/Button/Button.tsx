import React, { useState } from 'react';
import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'draw' | 'meet';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'draw' }) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(true);
    // Optional: reset animation after delay
    setTimeout(() => setActive(false), 1000); // adjust to match CSS duration
  };

  return (
    <button
      className={`button-base ${variant} ${active ? 'active' : ''}`}
      onClick={handleClick}
    >
      <div className="button-children">
        {children}
      </div>
      <span className="plusButton">+</span>
    </button>
  );
};

export default Button;