import React, { createContext, useContext } from "react";
import { Customer } from "../../Firebase/FirebaseFunctions/Customer/Customer";

interface CustomerContextProps {
  customer: Customer;
}

const CustomerContext = createContext<CustomerContextProps | undefined>(undefined);

interface CustomerProviderProps {
  customer: Customer;
  children: React.ReactNode;
}

export const CustomerProvider: React.FC<CustomerProviderProps> = ({ customer, children }) => {
  return (
    <CustomerContext.Provider value={{ customer }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = (): CustomerContextProps => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
  return context;
};
