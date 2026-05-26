import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "./init";

const storage = getStorage(app);

export function uploadEventImage(file, eventId) {
  const imageRef = ref(storage, `events/${eventId}/${file.name}`);
  const uploadTask = uploadBytesResumable(imageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      null,
      reject,
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
}
