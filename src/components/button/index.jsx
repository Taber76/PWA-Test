import React from 'react';

const Button = ({ onClick, text, isActive }) => {
  return (
    <button
      onClick={onClick}
      disabled={!isActive}
      className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isActive ? '' : 'opacity-50 cursor-not-allowed'}`}
    >
      {text}
    </button>
  );
};

export { Button };
