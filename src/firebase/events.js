import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "./init";

export async function createEvent(eventData) {
  const eventsRef = collection(db, "events");
  return addDoc(eventsRef, {
    ...eventData,
    createdAt: serverTimestamp(),
  });
}

export async function updateEvent(id, data) {
  const eventRef = doc(db, "events", id);
  return updateDoc(eventRef, data);
}
