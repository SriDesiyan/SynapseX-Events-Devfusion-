import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./init";

// Ensure persistent sessions (local) for auth flows
async function ensureLocalPersistence() {
  try {
    await setPersistence(auth, browserLocalPersistence);
  } catch (err) {
    console.warn("Could not set auth persistence", err);
  }
}

export async function registerWithEmail(name, role = "attendee", email, password) {
  await ensureLocalPersistence();

  const res = await createUserWithEmailAndPassword(auth, email, password);

  // Update displayName on the Firebase user profile
  if (res.user && name) {
    try {
      await updateProfile(res.user, { displayName: name });
    } catch (err) {
      console.warn("updateProfile failed", err);
    }
  }

  // Create user document in Firestore `users` collection
  try {
    const userRef = doc(db, "users", res.user.uid);
    await setDoc(userRef, {
      uid: res.user.uid,
      name: name || res.user.displayName || "",
      email: res.user.email,
      role,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("Failed to create user document", err);
    // Not throwing here to avoid leaving the user stranded — but caller can check auth state
  }

  return res;
}

export async function loginWithEmail(email, password) {
  await ensureLocalPersistence();
  return signInWithEmailAndPassword(auth, email, password);
}

export async function logoutUser() {
  return signOut(auth);
}
