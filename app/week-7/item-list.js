"use client";
import Item from './item.js';
import { useState } from "react";

export default function ItemList({ items }) {
    const [sortBy, setSortBy] = useState('name');

    const getSortedItems = () => {
        const itemsCopy = [...items]; // Create a copy of the items prop

        if (sortBy === 'name') {
            return itemsCopy.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'category') {
            return itemsCopy.sort((a, b) => a.category.localeCompare(b.category));
        } else if (sortBy === 'grouped category') {
            const groupedItems = itemsCopy.reduce((acc, item) => {
                if (!acc[item.category]) acc[item.category] = [];
                acc[item.category].push(item);
                return acc;
            }, {});
            return Object.keys(groupedItems).sort().flatMap(category => 
                [{ category, isCategory: true }, ...groupedItems[category].sort((a, b) => a.name.localeCompare(b.name))]
            );
        }
    };

    const sortedItems = getSortedItems();

    return (
        <main>
            <div className="flex justify-end">
                <h2 className="text-violet-900 font-bold">
                    <span className="mr-2">Sort By:</span>
                    <button className={`px-4 py-2 rounded-xl h-full ${sortBy === 'name' ? "bg-violet-400" : "bg-violet-200 hover:bg-violet-300"}`} onClick={() => setSortBy('name')}>Name</button>
                    <button className={`px-4 py-2 rounded-xl h-full ${sortBy === 'category' ? "bg-violet-400" : "bg-violet-200 hover:bg-violet-300"}`} onClick={() => setSortBy('category')}>Category</button>
                    <button className={`px-4 py-2 rounded-xl h-full ${sortBy === 'grouped category' ? "bg-violet-400" : "bg-violet-200 hover:bg-violet-300"}`} onClick={() => setSortBy('grouped category')}>Grouped Category</button>
                </h2>
            </div>
            {sortedItems.map((item, id) => (
                item.isCategory ? (
                    <h2 key={id} className="capitalize text-violet-900 font-bold text-xl">{item.category}</h2>
                ) : (
                    <Item key={id} name={item.name} category={item.category} />
                )
            ))}
        </main>
    );
}