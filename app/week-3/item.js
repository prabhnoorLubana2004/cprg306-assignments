import React from 'react';

export default function Item({ name, quantity, category }) {
  return (
    <li className="flex justify-between items-center bg-gray-800 p-4 rounded-md shadow-md mb-4 text-white">
      <div className="flex flex-col">
        <span className="font-bold text-md">{name}</span>
        <span className="text-sm text-gray-400">Buy {quantity} in {category}</span>
      </div>
    </li>
  );
}