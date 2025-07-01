// src/services/workerService.ts
import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from '../FirebaseConfig/firebase';

export interface AppWorker {
  id: string | number;
  name: string;
  services: string[];
}

export const getWorkers = async (customerId: string): Promise<AppWorker[]> => {
  // pointer to customers/{customerId}/treatments
  const workersRef = collection(doc(db, "customers", customerId), "workers");
  const snapshot = await getDocs(workersRef);

  const workers: AppWorker[] = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as AppWorker[];

  return workers;
};