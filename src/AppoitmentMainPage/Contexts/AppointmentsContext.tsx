// AppointmentsContext.tsx
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getDocs, collection, query, where, Timestamp } from "firebase/firestore";
import { Dayjs } from "dayjs";
import { Appointment } from "../../Firebase/FirebaseFunctions/Appointment/Appointment";
import { db } from "../../Firebase/FirebaseConfig/firebase";

interface AppointmentsContextProps {
  appointments: Appointment[];
  refreshAppointments: () => Promise<void>;
}

const AppointmentsContext = createContext<AppointmentsContextProps | undefined>(undefined);

interface AppointmentsProviderProps {
  customerId: number;
  date: Dayjs;
  children: React.ReactNode;
}

// Fetch weekly appointments from Firestore
const getWeeklyAppointments = async (customerId: number, date: Dayjs): Promise<Appointment[]> => {
  const startOfDay = date.startOf("day").toDate();
  const endOfWeek = date.add(5, "day").endOf("day").toDate();

  const appointmentsRef = collection(db, `customers/${customerId}/appointments`);
  const q = query(
    appointmentsRef,
    where("startDate", ">=", Timestamp.fromDate(startOfDay)),
    where("startDate", "<=", Timestamp.fromDate(endOfWeek))
  );

  const snapshot = await getDocs(q);

  const appointments: Appointment[] = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      startDate: (data.startDate as Timestamp).toDate(),
      endDate: data.endDate ? (data.endDate as Timestamp).toDate() : undefined,
      createdAt: data.createdAt ? (data.createdAt as Timestamp).toDate() : undefined,
      createdBy: data.createdBy ?? undefined,
    } as Appointment;
  });

  return appointments;
};

export const AppointmentsProvider: React.FC<AppointmentsProviderProps> = ({ customerId, date, children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const loadAppointments = useCallback(async () => {
    try {
      const data = await getWeeklyAppointments(customerId, date);
      setAppointments(data);
    } catch (err) {
      console.error("Failed to load weekly appointments", err);
    }
  }, [customerId, date]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  return (
    <AppointmentsContext.Provider value={{ appointments, refreshAppointments: loadAppointments }}>
      {children}
    </AppointmentsContext.Provider>
  );
};

export const useAppointments = (): AppointmentsContextProps => {
  const context = useContext(AppointmentsContext);
  if (!context) {
    throw new Error("useAppointments must be used within an AppointmentsProvider");
  }
  return context;
};
