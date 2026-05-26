import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  getDocs,
  query,
  where,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
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

export async function deleteEvent(id) {
  const eventRef = doc(db, "events", id);
  return deleteDoc(eventRef);
}

export async function getEventById(id) {
  const eventRef = doc(db, "events", id);
  const snap = await getDoc(eventRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export async function getLiveEvents() {
  const eventsRef = collection(db, "events");
  try {
    // Try to return events marked as live, fallback to all events
    const q = query(eventsRef, where("status", "==", "live"));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    }

    const all = await getDocs(eventsRef);
    return all.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error("getLiveEvents", err);
    return [];
  }
}

export async function getEventsByOrganizer(uid) {
  const eventsRef = collection(db, "events");
  const q = query(eventsRef, where("organizerId", "==", uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}
