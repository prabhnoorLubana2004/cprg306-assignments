"use client";
import Item from "./item";
import itemsJson from "./items.json";
import React, { useState } from 'react';


export default function ItemList(){
  const [sortBy, setSortBy] = useState("name");

  let items = [...itemsJson]; // a copy of itemsJson

  if (sortBy == "name") {
    items.sort((a, b) => a.name.localeCompare(b.name));
  };

  if (sortBy == "category"){
    items.sort((a, b) => a.category.localeCompare(b.category));
  };
 
 
  return (
    <main className="m-4 text-white bg-slate-950 flex flex-col">
      {/* <form onChange={handleSubmit} className = "p-2 m-4 text-white max-w-sm w-full"> */} 
      <h2 className="text-3xl font-bold m-2">Shopping List</h2>
      <div className="px-4">
        <div>
        <label for="sort">Sort by: </label>
        <button className="bg-orange-500 p-1 m-2 w-28" onClick={()=>setSortBy("name")}>Name</button>
        <button className="bg-orange-700 p-1 m-2 w-28" onClick={()=>setSortBy("category")}>Category</button>  
        </div>
        <ul> 
          {items.map((item) => (
          <li key={item.name}  className="p-2 m-4 bg-slate-900 max-w-sm">
            <h2 className="text-xl font-bold">{item.name}</h2> 
            <div className="text-sm">Buy {item.quantity} in {item.category}</div>         
          </li>
        ))}
        </ul>
      </div>
  
  </main>
  );
}