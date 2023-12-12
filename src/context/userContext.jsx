/* eslint-disable react/prop-types */
import { createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const user = "happyamy2016";
    return (
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
};
