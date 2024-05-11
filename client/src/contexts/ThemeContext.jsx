import React, { useState, useContext, useEffect } from "react";

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export function useTheme() {
    return useContext(ThemeContext);
}

export function useThemeUpdate() {
    return useContext(ThemeUpdateContext);
}

export function ThemeProvider({ children }) {
    const [darkTheme, setDarkTheme] = useState(false);

    useEffect(() => {
        let savedMode = localStorage.getItem('m-app-lib-dark-theme');
        if (savedMode == 'true') setDarkTheme(true);
        else setDarkTheme(false);
    }, []);

    useEffect(() => {
        if (darkTheme) {
            localStorage.setItem('m-app-lib-dark-theme', 'true');
        } else {
            localStorage.setItem('m-app-lib-dark-theme', 'false');
        }
    }, [darkTheme]);

    function toggleTheme() {
        setDarkTheme(prevDarkTheme => !prevDarkTheme);
    }

    return (
        <ThemeContext.Provider value={darkTheme}>
            <ThemeUpdateContext.Provider value={toggleTheme}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    );
};