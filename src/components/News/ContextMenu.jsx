import React from 'react';

function ContextMenu({ actions }) {
  return (
    <div className="absolute top-12 right-4 w-48 bg-gray-800 rounded-lg shadow-lg z-10 py-2">
      <ul>
        {actions.map((action, index) => (
          <li 
            key={index} 
            onClick={action.handler}
            className="px-4 py-2 text-white text-sm cursor-pointer hover:bg-gray-700"
          >
            {action.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContextMenu;