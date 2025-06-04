import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6FBG2R1GKTnfbbCLHLypINGZ-VjuvlOA",
  authDomain: "nwitter-reloaded-e5bb4.firebaseapp.com",
  databaseURL: "https://nwitter-reloaded-e5bb4-default-rtdb.firebaseio.com",
  projectId: "nwitter-reloaded-e5bb4",
  storageBucket: "nwitter-reloaded-e5bb4.firebasestorage.app",
  messagingSenderId: "998417620123",
  appId: "1:998417620123:web:1ab549bb57562dc318ba3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);