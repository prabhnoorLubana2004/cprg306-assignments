import React from 'react';
import ItemList from './item-list';

export default function Page() {
  return (
    <main className="p-4 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-5">Shopping List</h1>
      <ItemList />
    </main>
  );
}