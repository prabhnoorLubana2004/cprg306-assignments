import React, { useState, useEffect } from 'react';
import { getItems } from '../_services/shopping-list-service'; // Adjust path as necessary
import ItemList from './item-list';
import NewItem from './new-item'; 
import MealIdeas from './meal-ideas'; 

const ShoppingPage = () => {
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState('');

  // Load items from Firestore when the component mounts
  useEffect(() => {
    async function loadItems() {
      const userId = "sampleUserId"; // Replace this with actual userId logic
      const fetchedItems = await getItems(userId);
      setItems(fetchedItems);
    }
    loadItems();
  }, []);

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleItemSelect = (item) => {
    const cleanedItemName = item.name.split(',')[0].trim();
    setSelectedItemName(cleanedItemName);
  };

  return (
    <main className="min-h-screen bg-gray-900 p-3">
      <div className="max-w-xl mx-auto flex space-x-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-center text-white mb-6">Shopping List</h1>
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <div className="flex-1">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
};

export default ShoppingPage;