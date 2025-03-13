import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import * as yup from 'yup';

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
  createdAt: yup
    .date()
    .optional(),
  lastModified: yup
    .date()
    .optional()
});


// Customer.ts
export class Customer {
  id: number; // phone number as ID
  firstName: string;
  lastName: string;
  createdAt?: Date; // Optional since it will be set by the server

  constructor(id: number, firstName: string, lastName: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdAt = undefined;
  }

  toString(): string {
    return `${this.firstName} ${this.lastName} - Created At: ${this.createdAt}`;
  }
}

export const customerConverter = {
  toFirestore: (customer: Customer): DocumentData => {
    // Only include createdAt if it's not undefined
    const firestoreData: DocumentData = {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
    };
    if (customer.createdAt) {
      firestoreData.createdAt = customer.createdAt;
    }
    return firestoreData;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: any): Customer => {
    const data = snapshot.data(options);
    const customer = new Customer(data.id, data.firstName, data.lastName);
    customer.createdAt = data.createdAt ? data.createdAt.toDate() : undefined; // Ensure Date conversion if exists
    return customer;
  }
};
