import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

export const environment = {
    firebase: {
        apiKey: "AIzaSyCRGSBFw1jzoCbKe768HLlZBU4dXY1iMf4",
        authDomain: "noteable-9ebe5.firebaseapp.com",
        projectId: "noteable-9ebe5",
        storageBucket: "noteable-9ebe5.appspot.com",
        messagingSenderId: "225580247983",
        appId: "1:225580247983:web:e97d7a4017f119264cdd5a",
        measurementId: "G-D9VM0ELJRT"
    }
};

const app = initializeApp(environment.firebase);
export const auth = getAuth(app);