import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

export const environment = {
    firebase: {





        
    }
};

const app = initializeApp(environment.firebase);
export const auth = getAuth(app);
