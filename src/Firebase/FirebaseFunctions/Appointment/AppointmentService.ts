import {
  Firestore,
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Appointment, appointmentSchema } from "./Appointment";
import dayjs from "dayjs";
import { ServiceService } from "../Service/ServiceService";
import { convertToDate } from "../../../AppoitmentMainPage/Utilities/DateFormatter";


// Firestore data converter for Appointment
export const appointmentConverter = {
  toFirestore: (appointment: Appointment): DocumentData => {
    const data: Record<string, any> = {
      customerId: appointment.customerId,
      workerId: appointment.workerId,
      service: appointment.service,
      startDate: appointment.startDate,
      endDate: appointment.endDate,
      approved: appointment.approved ?? false,
    };

    if (appointment.createdAt) data.createdAt = appointment.createdAt;
    if (appointment.createdBy !== undefined) data.createdBy = appointment.createdBy;

    return data;
  },

  fromFirestore: (snapshot: QueryDocumentSnapshot, options: any): Appointment => {
    const data = snapshot.data(options);

    const startDate = convertToDate(data.startDate);
    const endDate = convertToDate(data.endDate);

    if (!startDate || !endDate) {
      throw new Error("startDate and endDate must be valid Date values");
    }

    // סדר פרמטרים נכון לפי הבנאי:
    const appointment = new Appointment(
      data.customerId,
      data.workerId,
      data.service,
      startDate,
      endDate,
      data.approved ?? false
    );

    appointment.id = snapshot.id;
    appointment.createdAt = convertToDate(data.createdAt);
    appointment.createdBy = data.createdBy;

    return appointment;
  },
};


class AppointmentService {
  private db: Firestore;
  private collectionPath: string = "customers";
  private serviceService: ServiceService;

  constructor(db: Firestore) {
    this.db = db;
    this.serviceService = new ServiceService(db);
  }

  async addAppointment(
    customerId: number,
    workerId: number,
    serviceId: string,
    startDate: Date
  ): Promise<void> {
    try {
      const customerRef = doc(this.db, this.collectionPath, customerId.toString());
      const customerSnap = await getDoc(customerRef);

      if (!customerSnap.exists()) {
        throw new Error(`Customer with id ${customerId} was not found`);
      }

      const durationInMinutes: number = await this.serviceService.getServiceDuration(customerId.toString(), serviceId);
      const endDate = dayjs(startDate).add(durationInMinutes, "minute").toDate();

      const newAppointment = new Appointment(customerId, workerId, serviceId, startDate, endDate);
      await appointmentSchema.validate(newAppointment, { abortEarly: false });

      const appointmentsRef = collection(this.db, `${this.collectionPath}/${customerId}/appointments`).withConverter(appointmentConverter);
      const docRef = doc(appointmentsRef);

      await setDoc(docRef, appointmentConverter.toFirestore({ ...newAppointment, id: docRef.id } as Appointment));
      console.log("Appointment added successfully with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding appointment:", error);
      throw new Error("Failed to add appointment: " + error);
    }
  }

  async deleteAppointment(customerId: number, appointmentId: string): Promise<void> {
    try {
      const appointmentRef = doc(this.db, `${this.collectionPath}/${customerId}/appointments`, appointmentId);
      await deleteDoc(appointmentRef);
      console.log("Appointment canceled successfully!");
    } catch (error) {
      console.error("Error canceling appointment:", error);
      throw new Error("Failed to cancel appointment: " + error);
    }
  }

  async getAppointmentsByDate(customerId: number, targetDate: Date): Promise<Appointment[]> {
    try {
      const startOfDay = dayjs(targetDate).startOf("day").toDate();
      const endOfDay = dayjs(targetDate).endOf("day").toDate();

      const appointmentsRef = collection(this.db, `${this.collectionPath}/${customerId}/appointments`).withConverter(appointmentConverter);

      const q = query(
        appointmentsRef,
        where("startDate", ">=", Timestamp.fromDate(startOfDay)),
        where("startDate", "<=", Timestamp.fromDate(endOfDay))
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error("Error fetching appointments by date:", error);
      throw new Error("Failed to fetch appointments: " + error);
    }
  }
}

export { AppointmentService };
