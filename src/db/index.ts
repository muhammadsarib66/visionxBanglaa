

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase configuration
const saribCdn = {
  apiKey: "AIzaSyDJjcDTMGvD5jFcdu3z1DN3eixKaqaOEL0",
  authDomain: "visionx-6da9c.firebaseapp.com",
  projectId: "visionx-6da9c",
  storageBucket: "visionx-6da9c.appspot.com",
  messagingSenderId: "209834139487",
  appId: "1:209834139487:web:d40634aaa7f98922e7e0ea",
  measurementId: "G-HHEBHHYR9C"
};

// const HaseebCdn = {
//     apiKey: "AIzaSyAr6o9WS4EqbP79YFwMeYmc8wkP5D9Pe0A",
//     authDomain: "visionxecosystems.firebaseapp.com",
//     projectId: "visionxecosystems",
//     storageBucket: "visionxecosystems.appspot.com",
//     messagingSenderId: "761868686239",
//     appId: "1:761868686239:web:65f6cd4c44bf5e8936a3aa",
//     measurementId: "G-GDB5Y83RTH"
//   };
let app;
if (!getApps().length) {
  app = initializeApp(saribCdn);
} else {
  app = getApp();
}

export const db = getFirestore(app);
export const storage = getStorage(app);

let analytics :any ;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  } else {
    console.log("Analytics not supported in this environment.");
  }
});

export { analytics };
