"use client";
import { useState } from "react";
export default function NewItem( {onAddItem} ){
    const [quantity, setQuantity] = useState(1);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("produce");
    const increment = () => {
        if(quantity<20){
            setQuantity(quantity + 1)
        }
    };
    const decrement = () => {
        if(quantity>1){
            setQuantity(quantity - 1)
        }
    }
    const handleSubmission = (event) => {
        event.preventDefault();
        let id = Math.floor(Math.random() * 1000000);
        let item = {id, name, quantity, category};
        onAddItem(item);
        setName("");
        setQuantity(1);
        setCategory("produce");
    }
    return(
        
        <div className="flex justify-start mt-4 ml-4">
            
            <form onSubmit={handleSubmission} className=" bg-slate-900 p-2 w-96">
                <input type="text" required value={name} placeholder="Item name" onChange={(event) => setName(event.target.value)} className="text-black mb-4 flex-1 w-full h-12 rounded-md p-2" /><br />
                <div className="flex justify-between items-center">
                    <div className="bg-white p-2  w-36 rounded-md">
                    <input type="text" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} className="text-black w-10 mr-4" />
                    <button type="button" onClick={decrement} disabled={quantity==0} className={` text-white w-8 rounded mx-1 ${quantity > 1 ? 'bg-blue-500 hover:bg-blue-700' : 'bg-slate-400 cursor-not-allowed'}`}>-</button>
                    <button type="button" onClick={increment} disabled={quantity==20} className={` text-white w-8 rounded ${quantity < 20 ? 'bg-blue-500 hover:bg-blue-700' : 'bg-slate-400 cursor-not-allowed'}`}>+</button>
                    </div>
                    <div className="">
                    <select value={category} onChange={(event) => setCategory(event.target.value)} className="text-black w-36 h-12 rounded-md p-3">
                        <option value="" disabled >Category</option>
                        <option value="produce">Produce</option>
                        <option value="dairy">Dairy</option>
                        <option value="bakery">Bakery</option>
                        <option value="meat">Meat</option>
                        <option value="frozen">Frozen</option>
                        <option value="canned">Canned</option>
                        <option value="beverages">Beverages</option>
                        <option value="snacks">Snacks</option>
                        <option value="household">Household</option>
                        <option value="personal">Personal</option>
                    </select>
                    </div>
                </div>
                <br />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white w-full h-10 rounded-md font-bold">+</button>
            </form>
            
        </div>
        
       
    );
};