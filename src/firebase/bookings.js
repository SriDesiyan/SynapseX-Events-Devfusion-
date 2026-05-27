import { addDoc, collection, getDocs, query, where, doc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./init";

export async function createBooking(userId, eventId, opts = {}) {
  // Check for duplicate booking
  const existing = await checkDuplicateBooking(userId, eventId);
  if (existing) throw new Error("You have already booked this event.");

  const bookingsRef = collection(db, "bookings");
  const ticketCode = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const paymentStatus = opts.paymentStatus || "completed";

  const docRef = await addDoc(bookingsRef, {
    userId,
    eventId,
    bookingDate: serverTimestamp(),
    paymentStatus,
    ticketType: opts.ticketType || "standard",
    ticketCode,
  });

  return { id: docRef.id, ticketCode };
}

export async function checkDuplicateBooking(userId, eventId) {
  const bookingsRef = collection(db, "bookings");
  const q = query(bookingsRef, where("userId", "==", userId), where("eventId", "==", eventId));
  const snapshot = await getDocs(q);
  return snapshot.docs.length > 0;
}

export async function getBookingsByUser(userId) {
  const bookingsRef = collection(db, "bookings");
  const q = query(bookingsRef, where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getBookingsByEvent(eventId) {
  const bookingsRef = collection(db, "bookings");
  const q = query(bookingsRef, where("eventId", "==", eventId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function updateBooking(id, data) {
  const bookingRef = doc(db, "bookings", id);
  return updateDoc(bookingRef, data);
}

export async function getBookingById(id) {
  const bookingRef = doc(db, "bookings", id);
  const snap = await getDoc(bookingRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}
