import { Firestore, doc, setDoc, getDoc, updateDoc, deleteDoc, collection } from "firebase/firestore";
import { Customer, customerConverter, customerSchema } from './Customer';
import { Appointment, appointmentSchema } from "../Appointment/Appointment";

class CustomerService {
  private db: Firestore;
  private collectionPath: string = 'customers';

  constructor(db: Firestore) {
    this.db = db;
  }


  // add customer if not exists with validation || permission: admin or authenticated
  async addCustomer(customerData: Customer): Promise<void> {
    try {
      // Validate customer data against the schema
      await customerSchema.validate(customerData, { abortEarly: false });

      const docRef = doc(this.db, this.collectionPath, customerData.id.toString());
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef.withConverter(customerConverter), customerData);
        console.log("customer created successfully!");
      } else {
        console.log("customer already exists. No new customer created.");
      }
    } catch (error) {
      console.error("Validation error or other error:", error);
      throw new Error("Failed to create customer: " + error);
    }
  }

  // Update customer fields with validation
  async updateCustomer(customerId: number, updatedFields: Partial<Customer>): Promise<void> {
    try {
      // Validate updated fields against the schema
      await customerSchema.validate(updatedFields, { abortEarly: false });

      const docRef = doc(this.db, this.collectionPath, customerId.toString()).withConverter(customerConverter);
      await updateDoc(docRef, updatedFields);
      console.log("Customer updated successfully!");
    } catch (error) {
      console.error("Validation error or other error:", error);
      throw new Error("Failed to update customer: " + error);
    }
  }

  // Delete customer 
  async deleteCustomer(customerId: number): Promise<void> {
    const docRef = doc(this.db, this.collectionPath, customerId.toString());
    await deleteDoc(docRef);
    console.log("customer deleted successfully!");
  }

  // Create a new appointment with an auto-generated ID
  async addAppointment(customerId: number, workerId: number, service: string, date: Date): Promise<void> {
    try {
      const costumerRef = doc(this.db, this.collectionPath, customerId.toString());
      const costumerSnap = await getDoc(costumerRef);

      if (!costumerSnap.exists()) {
        throw new Error("Customer with id: " + customerId.toString() + " was not found");
      }

      const newAppointment = new Appointment(customerId, workerId, service, date);
      await appointmentSchema.validate(newAppointment, { abortEarly: false });

      const appointmentsRef = collection(this.db, `${this.collectionPath}/${customerId}/appointments`);
      const docRef = doc(appointmentsRef); // Firebase generates a unique ID automatically

      await setDoc(docRef, { ...newAppointment, id: docRef.id }); // Spread the appointment data and set the ID
      console.log("Appointment added successfully with ID:", docRef.id);
      newAppointment.id = docRef.id; // Update the appointment object with the new ID
    } catch (error) {
      console.error("Error adding appointment:", error);
      throw new Error("Failed to add appointment: " + error);
    }
  }

  // Cancel an appointment
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
}

export { CustomerService };
