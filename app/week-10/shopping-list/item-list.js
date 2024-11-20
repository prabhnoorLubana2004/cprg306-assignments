"use client";

import React, { useState } from 'react';
import Item from './item';

const ItemList = ({ items, onItemSelect }) => {
  const [sortBy, setSortBy] = useState("name");
  const [groupByCategory, setGroupByCategory] = useState(false);

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  const groupedItems = groupByCategory
    ? sortedItems.reduce((acc, item) => {
        const category = item.category;
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
      }, {})
    : null;

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setSortBy("name")}
          className={`px-4 py-2 rounded-lg ${
            sortBy === "name" ? "bg-blue-600 text-white" : "bg-blue-300"
          }`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => setSortBy("category")}
          className={`px-4 py-2 rounded-lg ${
            sortBy === "category" ? "bg-blue-600 text-white" : "bg-blue-300"
          }`}
        >
          Sort by Category
        </button>
        <button
          onClick={() => setGroupByCategory((prev) => !prev)}
          className={`px-4 py-2 rounded-lg ${
            groupByCategory ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {groupByCategory ? "Ungroup by Category" : "Group by Category"}
        </button>
      </div>
      <ul className="space-y-4">
        {groupByCategory
          ? Object.keys(groupedItems).map((category) => (
              <div key={category}>
                <h3 className="capitalize text-xl font-bold mb-2">{category}</h3>
                <ul>
                  {groupedItems[category].map((item) => (
                    <Item
                      key={item.id}
                      name={item.name}
                      quantity={item.quantity}
                      category={item.category}
                      onSelect={() => onItemSelect(item)}
                    />
                  ))}
                </ul>
              </div>
            ))
          : sortedItems.map((item) => (
              <Item
                key={item.id}
                name={item.name}
                quantity={item.quantity}
                category={item.category}
                onSelect={() => onItemSelect(item)}
              />
            ))}
      </ul>
    </div>
  );
};
export default ItemList;