import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppWorker, getWorkers } from '../../Firebase/FirebaseFunctions/WorkersService';

interface WorkersContextType {
  workers: AppWorker[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const WorkersContext = createContext<WorkersContextType | null>(null);

export const WorkersProvider: React.FC<{ customerId: string; children: React.ReactNode }> = ({ customerId, children }) => {
  const [workers, setWorkers] = useState<AppWorker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getWorkers(customerId);
      setWorkers(data);
      setError(null);
    } catch (err) {
      setError('שגיאה בטעינת עובדים');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [customerId]);

  return (
    <WorkersContext.Provider value={{ workers, loading, error, refresh: fetchData }}>
      {children}
    </WorkersContext.Provider>
  );
};

export const useWorkers = (): WorkersContextType => {
  const context = useContext(WorkersContext);
  if (!context) {
    throw new Error('useWorkers must be used within a WorkersProvider');
  }
  return context;
};
