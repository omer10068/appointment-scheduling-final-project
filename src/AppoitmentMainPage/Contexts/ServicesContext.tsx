import React, { createContext, useContext, useEffect, useState } from 'react';
import { Service } from '../../Firebase/FirebaseFunctions/Service/Service';
import { serviceService } from '../../Firebase/FirebaseConfig/firebase';

interface ServicesContextType {
  services: Service[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};

interface ServicesProviderProps {
  customerId: string;
  children: React.ReactNode;
}

export const ServicesProvider: React.FC<ServicesProviderProps> = ({ customerId, children }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data: Service[] = await serviceService.getServices(customerId);
      setServices(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <ServicesContext.Provider value={{ services, loading, error, refresh: fetchServices }}>
      {children}
    </ServicesContext.Provider>
  );
};