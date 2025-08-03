import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // ek unique code hota hai jo Firebase ko yeh batata hai ki request aapke specific project se aa rahi hai.
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
 // Simple terms mein, jab aap apni app mein login feature banate hain, to yeh domain us login system ko chalata hai.
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  //yeh ID Firebase ko batati hai ki aap kaunse project ke saath kaam kar rahe hain, taaki sahi data aur resources aapki app ke liye use ho sakein.
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  //Is storage bucket me aap apni app ke media files jaise images, videos, etc. ko store karte hain. Ye URL aapke project ke liye specific hota hai.
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  //Simple terms mein, yeh ID ensure karti hai ki notifications aapki app ke users tak sahi tarike se pahunch sakein
  appId: import.meta.env.VITE_FIREBASE_MESSAGING_APP_ID,
  //Ye aapki specific app ka unique identifier hota hai jo Firebase console me generate hota hai. Iska use Firebase ke andar aapki app ko uniquely identify karne ke liye kiya jata hai.
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
  //yeh ID aapki app ke performance aur user activity ko measure karne ke liye hoti hai.
};

const firebaseApp = initializeApp(firebaseConfig);
//Ye function Firebase project ki settings ko load karta hai aur aapki app ko Firebase se connect karta hai.
export default firebaseApp;
