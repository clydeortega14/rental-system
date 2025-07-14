import React from 'react';
import logoWeb from '@/../../resources/img/logo-web.png';

const BeePulseLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="relative w-56 h-56 flex items-center justify-center">
        {/* Ripple wave behind the logo */}
        <div className="absolute w-full h-full rounded-full border-4 border-yellow-400 animate-ping" />
        
        {/* Logo with heartbeat animation */}
        <img
          src={logoWeb}
          alt="Loading"
          className="relative z-10 w-32 h-32 animate-heartbeat"
        />
      </div>
    </div>
  );
};

export default BeePulseLoader;
