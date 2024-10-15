"use client";
import { useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("Produce");

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increment = () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
  };

  const handleSelect = (event) => {
    setCategory(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    let item = { name, quantity, category };
    console.log(item);
    alert(`name: ${name}, quantity: ${quantity}, category: ${category}`);

    setName("");
    setQuantity(1);
    setCategory("Produce");
  };
  return (
    <form
      className="p-2 m-4 bg-slate-900 text-black max-w-sm w-full"
      onSubmit={(event) => handleOnSubmit(event)}
    >
      <div class="mb-2">
        <input
          type="text"
          placeholder="Item name"
          required
          class="w-full mt-1 border-2 border-gray-300 p-2 rounded-lg font-sans"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="flex justify-between">
        <div className="p-2 mt-1 mb-1 rounded-md  bg-white text-white w-36">
          <div className="flex justify-between">
            <span className="text-black">{quantity}</span>
            <div className="flex">
              <button
                type="button"
                className="w-8 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 disabled:bg-gray-400 focus:ring-blue-400 focus:ring-opacity-75"
                onClick={decrement}
                disabled={quantity === 1}
              >
                -
              </button>
              <button
                type="button"
                className="w-8 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400  disabled:bg-gray-400 focus:ring-opacity-75 ml-1"
                onClick={increment}
                disabled={quantity === 20}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <select
          class="ml-1 border-2 border-gray-300 p-2 rounded-lg font-sans"
          onChange={(event) => handleSelect(event)}
        >
          <option value="" disabled="">
            Category
          </option>
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen foods">Frozen Foods</option>
          <option value="canned goods">Canned Goods</option>
          <option value="dry goods">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button
        type="submit"
        class="w-full mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        +
      </button>
    </form>
  );
}