import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { FieldValuePair } from "../src/api/v1/repositories/firestoreRepositories"

import * as serviceAccount from "../wizard-as-a-service-firebase-adminsdk-fbsvc-e199859a46.json";

// Initialize the Firebase app with the service account credentials
// This step is necessary before you can use any Firebase services
initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

const auth: Auth = getAuth();
const db: Firestore = getFirestore();

export { auth, db };
