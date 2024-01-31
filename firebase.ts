import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2yrilTjyRMQd1pq97QkEgnnS_AyTZHi0",
  authDomain: "dropbox-clone-7f3e1.firebaseapp.com",
  projectId: "dropbox-clone-7f3e1",
  storageBucket: "dropbox-clone-7f3e1.appspot.com",
  messagingSenderId: "555953817820",
  appId: "1:555953817820:web:515929109dcc2d7f15cc19",
  measurementId: "G-6DQW7Q79SS",
};
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
