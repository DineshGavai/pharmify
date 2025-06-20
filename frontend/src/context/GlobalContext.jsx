import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [isProductViewFormEditable, setIsProductViewFormEditable] = useState(true)
    
    // Header
    const [headerChildren, setHeaderChildren] = useState({})
    // Navigation
    const [isNavActive, setIsNavActive] = useState(false);
    const [activePage, setActivePage] = useState("home");

    return (
        <GlobalContext.Provider value={{
            isProductViewFormEditable, setIsProductViewFormEditable,
            headerChildren, setHeaderChildren,
            isNavActive, setIsNavActive,
            activePage, setActivePage
        }}>
            {children}
        </GlobalContext.Provider>
    )
}