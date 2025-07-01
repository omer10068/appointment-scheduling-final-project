import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import * as yup from 'yup';

// Define the type for working hours
export type WorkingHours = {
  [day: string]: {
    start: string;
    end: string;
  };
};

// Define a Yup schema for Customer validation
export const customerSchema = yup.object().shape({
  id: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must contain digits only")
    .required("Phone number is required"),
  firstName: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "First name must contain only letters and spaces")
    .min(2, "First name must be at least 2 characters long")
    .required("First name is required"),
  lastName: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Last name must contain only letters and spaces")
    .min(2, "Last name must be at least 2 characters long")
    .required("Last name is required"),
  createdAt: yup.date().optional(),
  lastModified: yup.date().optional(),
  workingHours: yup
    .object()
    .shape({
      Sunday: yup.object({ start: yup.string(), end: yup.string() }),
      Monday: yup.object({ start: yup.string(), end: yup.string() }),
      Tuesday: yup.object({ start: yup.string(), end: yup.string() }),
      Wednesday: yup.object({ start: yup.string(), end: yup.string() }),
      Thursday: yup.object({ start: yup.string(), end: yup.string() }),
      Friday: yup.object({ start: yup.string(), end: yup.string() }),
      Saturday: yup.object({ start: yup.string(), end: yup.string() }),
    })
    .optional()
});


// Customer.ts
export class Customer {
  id: number;
  firstName: string;
  lastName: string;
  createdAt?: Date;
  workingHours?: WorkingHours;

  constructor(id: number, firstName: string, lastName: string, workingHours?: WorkingHours) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.workingHours = workingHours;
  }

  toString(): string {
    return `${this.firstName} ${this.lastName} - Created At: ${this.createdAt}`;
  }
}

// Firestore converter
export const customerConverter = {
  toFirestore: (customer: Customer): DocumentData => {
    const firestoreData: DocumentData = {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
    };

    if (customer.createdAt) {
      firestoreData.createdAt = customer.createdAt;
    }

    if (customer.workingHours) {
      firestoreData.workingHours = customer.workingHours;
    }

    return firestoreData;
  },

  fromFirestore: (snapshot: QueryDocumentSnapshot, options: any): Customer => {
    const data = snapshot.data(options);
    const customer = new Customer(data.id, data.firstName, data.lastName, data.workingHours);
    customer.createdAt = data.createdAt?.toDate();
    return customer;
  }
};
