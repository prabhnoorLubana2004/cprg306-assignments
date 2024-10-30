"use client";

import { useState } from "react";

export default function NewItem({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("Produce");
 
  const handleSubmit = (event) => {
    event.preventDefault();
    let newItem = { name: name, quantity: quantity, category: category };
    console.log(newItem);

    if (name === "") {
      alert("Please enter an item name.");
      return;
    }
    alert(JSON.stringify(newItem));

    setQuantity(0);
    setName("");
    setCategory("produce");
  };

  const increment = () => {
    setQuantity(quantity < 20 ? quantity + 1 : qujantity);
  };
  const decrement = () => {
    setQuantity(quantity > 1 ? quantity - 1 : quantity);
  };

  return (
    <div className="text-center bg-violet-50 p-10 w-96 space-y-4">

      {/* Item Name */}
      <form className="w-full max-w-xs mx-auto space-y-4" onSubmit={(event) => handleSubmit(event)}>
        <label className="w-full">
          <input
            className="text-violet-900 p-2 w-full h-12 rounded-xl bg-primary bg-violet-200"
            placeholder="Item Name"
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        {/* Quantity buttons and Category dropdown in a row */}
        <div className="flex justify-center items-center space-x-4 w-full ">

          {/* Quantity buttons */}
          <div className="flex justify-center items-center space-x-2 bg-violet-200 p-3 rounded-xl w-min h-min">
            <p className="mb-0 text-violet-900 text-xl">{quantity}</p>
            <button className={`px-4 py-2 rounded-xl h-full  ${quantity === 1 ? "bg-violet-100" : "bg-violet-400 && hover:bg-violet-500"} text-violet-900`}type="button"onClick={decrement}>-</button>
            <button className={`px-4 py-2 rounded-xl h-full ${quantity === 20 ? "bg-violet-100" : "bg-violet-400 && hover:bg-violet-500"} text-violet-900`}type="button"onClick={increment}>+</button>
          </div>

          {/* Category dropdown */}
          <label htmlFor="category" className="w-full">
            <select
              className="text-violet-950 rounded-xl p-2 w-full h-12 bg-violet-200"
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="Produce">Produce</option>
              <option value="Dairy">Dairy</option>
              <option value="Bakery">Bakery</option>
              <option value="Meat">Meat</option>
              <option value="Frozen">Frozen Foods</option>
              <option value="Canned">Canned Goods</option>
              <option value="Dry">Dry Goods</option>
              <option value="Beverages">Beverages</option>
              <option value="Snacks">Snacks</option>
              <option value="Household">Household</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>

        {/* Submit button */}
        <div className="w-full">
          <button className="hover:bg-violet-300 text-violet-900 font-bold h-12 w-full rounded-xl bg-violet-200"type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}