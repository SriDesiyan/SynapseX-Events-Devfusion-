import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./init";

export async function createBooking(userId, eventId) {
  // Check for duplicate booking
  const existing = await checkDuplicateBooking(userId, eventId);
  if (existing) throw new Error("You have already booked this event.");

  const bookingsRef = collection(db, "bookings");
  const ticketCode = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  return addDoc(bookingsRef, {
    userId,
    eventId,
    bookingDate: new Date(),
    paymentStatus: "completed",
    ticketType: "standard",
    ticketCode,
  });
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
