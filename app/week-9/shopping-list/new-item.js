'use client';
import { useState } from 'react';
export default function AddNewItem({ onAddItem }) { 
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");
  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      quantity,
      category,
    };
    onAddItem(newItem);
    setName("");
    setQuantity(1);
    setCategory("produce");
  };
  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, 20));
  };
  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };
  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 text-white p-5 rounded-md flex flex-col items-center">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter item name"
        className="mb-4 p-2 text-black rounded-md"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="mb-4 p-2 text-black rounded-md"
      >
        <option value="produce">Produce</option>
        <option value="dairy">Dairy</option>
        <option value="bakery">Bakery</option>
        <option value="meat">Meat</option>
        <option value="frozen">Frozen Foods</option>
        <option value="canned">Canned Goods</option>
        <option value="dry">Dry Goods</option>
        <option value="beverages">Beverages</option>
        <option value="snacks">Snacks</option>
        <option value="household">Household</option>
        <option value="other">Other</option>
      </select>
      <div className="flex items-center justify-between w-full mb-4">
        <button
          type="button"
          onClick={decrementQuantity}
          className={`border-2 px-3 py-1 rounded-md ${
            quantity === 1 ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-blue-500 text-white'
          }`}
          disabled={quantity === 1}
        >
          -
        </button>
        <span className="text-lg mx-4">{quantity}</span>
        <button
          type="button"
          onClick={incrementQuantity}
          className={`border-2 px-3 py-1 rounded-md ${
            quantity === 20 ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-blue-500 text-white'
          }`}
          disabled={quantity === 20}
        >
          +
        </button>
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
        Submit
      </button>
    </form>
  );
}