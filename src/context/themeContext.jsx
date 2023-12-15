/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
    const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;
    const storedTheme = localStorage.getItem("theme");
    const [theme, setTheme] = useState(
        storedTheme || (prefersDarkMode ? "dark" : "light")
    );

    const toggleTheme = () => {
        const html = document.getElementsByTagName("html")[0];
        html.classList.remove(theme);
        const newTheme = theme === "light" ? "dark" : "light";
        html.classList.add(newTheme);
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    };

    useEffect(() => {
        const html = document.getElementsByTagName("html")[0];
        html.classList.add(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
