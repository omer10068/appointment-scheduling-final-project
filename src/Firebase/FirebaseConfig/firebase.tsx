// Import the functions you need from the Firebase SDKs
import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";
import {initializeFirestore, persistentLocalCache, persistentMultipleTabManager} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getFunctions} from "firebase/functions";
import {getStorage} from "firebase/storage";
import { ServiceService } from "../FirebaseFunctions/Service/ServiceService";
import { AppointmentService } from "../FirebaseFunctions/Appointment/AppointmentService";
import { CustomerService } from "../FirebaseFunctions/Customer/CustomerService";

// Firebase configuration (environment variables)
export const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
export const realtimeDB = getDatabase(app);
export const dataref = realtimeDB;

// Initialize Firestore with persistence configuration
export const db = initializeFirestore(app, {
    localCache: persistentLocalCache({tabManager: persistentMultipleTabManager()}),
});

// Initialize Authentication
export const auth = getAuth(app);

// Initialize Firebase Functions
export const functions = getFunctions(app);

// Initialize Firebase Storage
export const storage = getStorage(app);

export const serviceService = new ServiceService(db);
export const appointmentService = new AppointmentService(db);
export const customerService = new CustomerService(db);

export default app;
