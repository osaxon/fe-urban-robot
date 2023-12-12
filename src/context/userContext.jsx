/* eslint-disable react/prop-types */
import { createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const user = {
        username: "tickle122",
        name: "Tom Tickle",
        avatar_url:
            "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
    };
    return (
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
};
