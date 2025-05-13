import React, { useState } from 'react';
import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'draw' | 'meet';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'draw' }) => {
  const [explode, setExplode] = useState(false);
  const [active, setActive] = useState(false);

  const triggerExplosion = () => {
    setExplode(true);
    setTimeout(() => setExplode(false), 500); // Match CSS animation duration
  };

    const handleClick = () => {
    setActive(true);
    triggerExplosion();
    // Optional: reset animation after delay
    setTimeout(() => setActive(false), 1000); // adjust to match CSS duration
  };

  return (
    <button
      className={`button-base ${active ? 'active':''} ${variant} ${explode ? 'explode' : ''}`}
      onClick={handleClick}
      onMouseEnter={triggerExplosion}
    >
      <div className="button-children">
        {children}
      </div>
      <span className="plusButton">
        +
        {explode && (
          <>
            <span className="projectile left" />
            <span className="projectile top" />
          </>
        )}
      </span>
    </button>
  );
};

export default Button;
