import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

/**
 * Fetches all items for a specific user from Firestore.
 * @param {string} userId - The unique user ID used to retrieve the items.
 * @returns {Array} - An array of item objects containing document ID and data.
 */
export async function getItems(userId) {
  const items = [];
  try {
    // Create a query to get all items in the user's items subcollection
    const q = query(collection(db, `users/${userId}/items`));
    const querySnapshot = await getDocs(q);
    // Map through each document returned by the query and push data into items array
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
  } catch (error) {
    console.error("Error fetching items: ", error.message);
  }
  return items;
}

/**
 * Adds a new item to a specific user's list of items in Firestore.
 * @param {string} userId - The unique user ID for identifying the items subcollection.
 * @param {Object} item - The item object to be added.
 * @returns {string|null} - The ID of the newly added document, or null if an error occurred.
 */
export async function addItem(userId, item) {
  try {
    // Add a new document to the user's items subcollection
    const docRef = await addDoc(collection(db, `users/${userId}/items`), item);
    return docRef.id; // Return the ID of the newly created document
  } catch (error) {
    console.error("Error adding item: ", error.message);
    return null;
  }
}