"use client";

import { useState } from 'react';
import NewItem from './new-item.js';
import ItemList from './item-list.js';
import itemsData from './items.json';

export default function Page() {
    const [items, setItems] = useState(itemsData);

    const handleAddItem = (newItem) => {
        setItems([...items, newItem]);
    };

    return (
        <main className="flex flex-col">
            <h1 className='text-2xl font-bold text-violet-900 mb-4'>Shopping List</h1>
            <div className="flex w-full justify-center space-x-4">
                <div className="flex-1">
                    <ItemList items={items} />
                </div>
                <div className="flex-none self-center">
                    <NewItem onAddItem={handleAddItem} />
                </div>
            </div>
        </main>
    );
}