"use client";

import { useState, useEffect } from "react";

const fetchMealIdeas = async (ingredient) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data.meals;
}

const fetchMealDetails = async (mealId) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const data = await response.json();
    return data.meals[0];
}

export default function MealIdeas({ ingredient }) {
    const [meals, setMeals] = useState([]);
    const [expandedMealId, setExpandedMealId] = useState(null);
    const [mealDetails, setMealDetails] = useState({});
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [message, setMessage] = useState("Select an item to see meal ideas");

    const loadMealIdeas = async () => {
        if (ingredient) {
            const mealIdeas = await fetchMealIdeas(ingredient);
            if (mealIdeas && mealIdeas.length > 0) {
                setMeals(mealIdeas);
                setMessage(`Here are some meal ideas using ${ingredient}`);
            } else {
                setMeals([]);
                setMessage(`No meal ideas found for ${ingredient}`);
            }
            setSelectedMeal(null); // Clear selected meal when ingredient changes
        } else {
            setMeals([]); // Clear meals if no ingredient is provided
            setSelectedMeal(null); // Clear selected meal
            setMessage("Select an item to see meal ideas");
        }
    }

    const handleMealClick = async (mealId) => {
        if (expandedMealId === mealId) {
            setExpandedMealId(null); // Collapse if already expanded
            setSelectedMeal(null); // Clear selected meal
        } else {
            if (!mealDetails[mealId]) {
                const details = await fetchMealDetails(mealId);
                setMealDetails(prevDetails => ({ ...prevDetails, [mealId]: details }));
            }
            setExpandedMealId(mealId); // Expand the clicked meal
            setSelectedMeal(mealDetails[mealId] || await fetchMealDetails(mealId)); // Set selected meal
        }
    }

    useEffect(() => {
        loadMealIdeas();
    }, [ingredient]);

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
                <h2 className="capitalize-first-word text-3xl font-bold ml-2 mt-2">Meal Ideas</h2>
                <p className="ml-2 mt-2">{message}</p>
                <ul className="m-4 p-2 w-full">
                    {meals.map(meal => (
                        <li 
                            key={meal.idMeal} 
                            className={`text-xl bg-slate-900 text-white p-2 mb-1 cursor-pointer hover:bg-orange-700 ${expandedMealId === meal.idMeal ? 'bg-orange-500' : ''}`}
                            onClick={() => handleMealClick(meal.idMeal)}
                        >
                            {meal.strMeal}
                            {expandedMealId === meal.idMeal && mealDetails[meal.idMeal] && (
                                <div className="mt-2">
                                    <ul>
                                        {Array.from({ length: 20 }, (_, i) => i + 1).map(i => {
                                            const ingredient = mealDetails[meal.idMeal][`strIngredient${i}`];
                                            const measure = mealDetails[meal.idMeal][`strMeasure${i}`];
                                            return ingredient ? <li key={i}>{`${ingredient} - ${measure}`}</li> : null;
                                        })}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-4">
                {selectedMeal && (
                    <>
                        <div className="m-4 p-4 bg-slate-900 text-white rounded-md">
                            <h3 className="text-2xl font-bold">{selectedMeal.strMeal}</h3>
                            <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} className="w-full h-auto mt-2 rounded-md" />
                        </div>
                        <div className="m-4 p-4 bg-slate-900 text-white rounded-md">
                            <h3 className="text-2xl font-bold">Instructions</h3>
                            <div className="mt-2">
                                {selectedMeal.strInstructions.split('. ').map((step, index) => (
                                    <p key={index}>{step}.</p>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}