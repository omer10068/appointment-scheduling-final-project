// ServiceService.ts
import { collection, getDocs, doc, Firestore, getDoc, updateDoc } from "firebase/firestore";
import { Service } from "./Service";

class ServiceService {
  private db: Firestore;
  private collectionPath: string = "customers";

  constructor(db: Firestore) {
    this.db = db;
  }

  // Get all services under customers/{customerId}/services
  async getServices(customerId: string): Promise<Service[]> {
    try {
      const servicesRef = collection(doc(this.db, this.collectionPath, customerId), "services");
      const snapshot = await getDocs(servicesRef);

      const services: Service[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Service[];

      return services;
    } catch (error) {
      console.error("Error fetching services:", error);
      throw new Error("Failed to fetch services: " + error);
    }
  }

  // Get the duration time (in minutes) of a specific service
  async getServiceDuration(customerId: string, serviceId: string): Promise<number> {
    try {
      const serviceRef = doc(this.db, this.collectionPath, customerId, "services", serviceId);
      const snapshot = await getDoc(serviceRef);

      if (!snapshot.exists()) {
        throw new Error("Service not found");
      }

      const data = snapshot.data();
      const durationTime: number = data.durationTime;

      return durationTime;
    } catch (error) {
      console.error("Error fetching service duration:", error);
      throw new Error("Failed to fetch service duration: " + error);
    }
  }

  // Update the fields durationTime of a service
  // ## EXAMPLE:
  // await serviceService.updateService("123456", "Haircut", {
  //   name: "Haircut & Styling",
  //   durationTime: { hours: 1, minutes: 15 },
  //   workers: ["worker1", "worker2", "worker3"]
  // });
  async updateService(
    customerId: string,
    serviceId: string,
    updates: Partial<Pick<Service, "name" | "durationTime" | "workers">>
  ): Promise<void> {
    try {
      const serviceRef = doc(this.db, this.collectionPath, customerId, "services", serviceId);
      await updateDoc(serviceRef, updates);
      console.log("Service updated successfully");
    } catch (error) {
      console.error("Error updating service:", error);
      throw new Error("Failed to update service: " + error);
    }
  }
}

export { ServiceService };
