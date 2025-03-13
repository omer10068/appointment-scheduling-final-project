// Define a Yup schema for Appointment validation
import * as yup from 'yup';

export const appointmentSchema = yup.object().shape({
  id: yup.string().optional(),
  customerId: yup.number().positive().integer().required("Customer ID is required"),
  workerId: yup.number().positive().integer().required("Worker ID is required"),
  service: yup.string().required("Service type is required"),
  date: yup.date().required("Appointment date is required"),
  approved: yup.boolean().default(false),  // Default is set to false and is not required
  createdAt: yup
    .date()
    .optional(),
});

// Appointment.ts
export class Appointment {
  id?: string;  // ID is optional, will be set by Firebase
  customerId: number;  // ID of the user who made the appointment
  workerId: number;  // ID of the specific business owner (e.g., a specific barber or beautician)
  service: string;  // Type of service for the appointment
  date: Date;  // Date and time of the appointment
  approved: boolean;  // Whether the appointment has been approved

  constructor(customerId: number, workerId: number, service: string, date: Date, approved: boolean = false, id?: string) {
    this.customerId = customerId;
    this.workerId = workerId;
    this.service = service;
    this.date = date;
    this.approved = approved;
    this.id = id; // Optional, if provided
  }
}
