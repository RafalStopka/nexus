import React, { createContext, useContext, useState } from "react";
import { UpdateType, UserData } from "../types/commonTypes";


const UserDataContext = createContext<{
  values: UserData;
  update: UpdateType;
} | undefined>(undefined);

export const UserDataProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [values, setValues] = useState<UserData>({
    hex: "#000000",
    currentColor: "Black",
    name: "NN",
  });

  const update = (key: keyof UserData, value: string) => {
    setValues((prevValues) => ({ ...prevValues, [key]: value }));
  };

  return (
    <UserDataContext.Provider value={{ values, update }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};
