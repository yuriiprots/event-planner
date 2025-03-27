import { db } from "./firebaseConfig";
import {
  collection,
  setDoc,
  getDocs,
  getDoc,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

// USERS

export const createUserInFirestore = async (user) => {
  try {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      createdAt: new Date(),
      uid: user.uid,
      email: user.email,
    });
  } catch (error) {
    console.error("Error creating user in Firestore:", error);
    throw error;
  }
};

export const updateUserInFirestore = async (uid, userData) => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, userData);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const getUserFromFirestore = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.log("User does not exist in Firestore.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// EVENTS

const eventsCollection = collection(db, "events");

export const fetchEventsFromFirestore = async (userId) => {
  try {
    const userQuery = query(eventsCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(userQuery);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const addEventToFirestore = async (eventToAdd) => {
  try {
    const docRef = await addDoc(eventsCollection, {
      ...eventToAdd,
      createdAt: new Date(),
    });
    return { id: docRef.id, ...eventToAdd };
  } catch (error) {
    console.error("Error adding event:", error);
    throw error;
  }
};

export const updateEventInFirestore = async (eventToEdit) => {
  try {
    const docRef = doc(eventsCollection, eventToEdit.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().userId === eventToEdit.userId) {
      await updateDoc(docRef, eventToEdit);
      return eventToEdit;
    } else {
      throw new Error("Unauthorized: You can only update your own events.");
    }
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export const deleteEventInFirestore = async (userId, eventId) => {
  try {
    const docRef = doc(eventsCollection, eventId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().userId === userId)
      await deleteDoc(docRef);
    else {
      throw new Error(
        "Unauthorized: You can only delete your own events."
      );
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};
