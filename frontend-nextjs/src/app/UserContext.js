"use client"
import { createContext, useContext, useState } from 'react';

// Create context
const UserContext = createContext();

// Context provider component
export const UserProvider = ({ children }) => {
    const [login, setLogin] = useState(false);

    return (
        <UserContext.Provider value={{ login, setLogin}}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to access the context
export const useUserContext = () => useContext(UserContext);
