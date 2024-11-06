"use client";
import Item from "./item";
import { useState } from "react";

export default function ItemList({ items, onItemSelect }) {
    const [sortBy, setSortBy] = useState("name");

    // Create a copy of items
    const itemsCopy = [...items];

    // Sort the copied items based on the sortBy state
    const sortedItems = itemsCopy.sort((a, b) => {
        if (sortBy === "name") {
            return a.name.localeCompare(b.name);
        }
        if (sortBy === "category" || sortBy === "groupedCategory") {
            return a.category.localeCompare(b.category);
        }
        return 0;
    });

    const handleNameSort = () => {
        setSortBy("name");
    }

    const handleCategorySort = () => {
        setSortBy("category");
    }

    const handleGroupedCategorySort = () => {
        setSortBy("groupedCategory");
    }

    const groupItemsByCategory = (itemsCopy) => {
        return itemsCopy.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
        }, {});
    };

    const groupedItems = groupItemsByCategory(sortedItems);

    return (
        <main>
            <section className="flex justify-between items-center mt-4 w-max">
                <h1 className="text-xl ml-2 mr-4 m-2">Sort by:</h1>
                <button onClick={handleNameSort} className={`text-white w-28 m-2 h-10 rounded-md ${sortBy === "name" ? "bg-orange-500 font-bold" : "bg-orange-700"}`}>Name</button>
                <button onClick={handleCategorySort} className={`text-white w-28 m-2 h-10 rounded-md ${sortBy === "category" ? "bg-orange-500 font-bold" : "bg-orange-700"}`}>Category</button>
                <button onClick={handleGroupedCategorySort} className={`text-white w-28 m-2 h-16 rounded-md ${sortBy === "groupedCategory" ? "bg-orange-500 font-bold" : "bg-orange-700"}`}>Grouped Category</button>
            </section>
            <section className="mt-4">
                {sortBy === "groupedCategory" ? (
                    Object.keys(groupedItems).map((category) => (
                        <div key={category}>
                            <h2 className="text-2xl font-bold mt-4 capitalize">{category}</h2>
                            {groupedItems[category].map((item, index) => (
                                <Item key={index} name={item.name} quantity={item.quantity} category={item.category} onSelect={() => onItemSelect(item)} />
                            ))}
                        </div>
                    ))
                ) : (
                    sortedItems.map((item, index) => (
                        <Item key={index} name={item.name} quantity={item.quantity} category={item.category} onSelect={() => onItemSelect(item)} />
                    ))
                )}
            </section>
        </main>
    );
};