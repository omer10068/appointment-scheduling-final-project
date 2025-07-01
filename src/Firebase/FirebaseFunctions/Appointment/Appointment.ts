// Define a Yup schema for Appointment validation
import * as yup from 'yup';

export const appointmentSchema = yup.object().shape({
  id: yup.string().optional(),
  customerId: yup.number().positive().integer().required("Customer ID is required"),
  workerId: yup.number().positive().integer().required("Worker ID is required"),
  service: yup.string().required("Service type is required"),
  startDate: yup.date().required("Appointment startDate is required"),
  endDate: yup.date().required("Appointment endDate is required"),
  approved: yup.boolean().default(false),  // Default is set to false and is not required
  createdAt: yup.date().optional(),
  createdBy: yup.number().positive().integer().optional(),
});

export class Appointment {
  customerId: number;  // ID of the user who made the appointment
  workerId: number;    // ID of the specific business owner (e.g., a specific barber or beautician)
  service: string;     // id - Type of service for the appointment
  startDate: Date;     // start date and time of the appointment
  endDate: Date;       // end date and time of the appointment
  approved: boolean;   // Whether the appointment has been approved - לא חובה בבנאי, אבל תמיד קיים
  createdAt?: Date;
  createdBy?: number;
  id?: string;

  constructor(
    customerId: number,
    workerId: number,
    service: string,
    startDate: Date,
    endDate: Date,
    approved: boolean = false
  ) {
    this.customerId = customerId;
    this.workerId = workerId;
    this.service = service;
    this.startDate = startDate;
    this.endDate = endDate;
    this.approved = approved;
  }
}

