"use client";

import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json";
import MealIdeas from "./meal-ideas";
import { useState } from "react";

export default function Page(){
    const [items, setItems] = useState(itemsData);
    const [selectedItemName, setSelectedItemName] = useState("");
    const handleAddItem = (item) => {
        setItems([...items, item]);
    }
    const handleItemSelect = (item) => {
        console.log("Item Selected:",item);
        const cleanedName = item.name.split(',')[0].trim().replace(/[^a-zA-Z ]/g, "");
        setSelectedItemName(cleanedName);
    }
    return(
        <main className="flex flex-row p-4">
            <div className="basis-1/3">
            <h1 className="capitalize-first-word text-3xl font-bold ml-2 mt-2">Shopping List</h1>
            <NewItem onAddItem={handleAddItem} />
            <ItemList items={items} onItemSelect={handleItemSelect}/> 
            </div>
            <div className="basis-2/3 mt-1" >
                <MealIdeas ingredient={selectedItemName} />
            </div>
        </main>
    );
};