import { Firestore, doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Customer, customerConverter, customerSchema, WorkingHours } from './Customer';

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
    // Get full customer object
    async getCustomer(customerId: number): Promise<Customer | null> {
      try {
        const docRef = doc(this.db, this.collectionPath, customerId.toString()).withConverter(customerConverter);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return docSnap.data();
        } else {
          console.warn("Customer not found.");
          return null;
        }
      } catch (error) {
        console.error("Error fetching customer:", error);
        throw new Error("Failed to fetch customer: " + error);
      }
    }
  
    // Get only working hours
    async getWorkingHours(customerId: number): Promise<Record<string, string> | null> {
      try {
        const docRef = doc(this.db, this.collectionPath, customerId.toString());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          return data.workingHours || null;
        } else {
          console.warn("Customer not found.");
          return null;
        }
      } catch (error) {
        console.error("Error fetching working hours:", error);
        throw new Error("Failed to fetch working hours: " + error);
      }
    }

    async setWorkingHours(customerId: number, workingHours: WorkingHours): Promise<void> {
      try {
        const customerRef = doc(this.db, this.collectionPath, customerId.toString());
        await updateDoc(customerRef, {
          workingHours: workingHours
        });
        console.log("Working hours updated successfully!");
      } catch (error) {
        console.error("Error setting working hours:", error);
        throw new Error("Failed to update working hours: " + error);
      }
    }
}

export { CustomerService };
