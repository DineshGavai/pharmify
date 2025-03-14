import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [userInfo, setUserInfo] = useState({
        name: "Vedant Mali",
        email: "vedantmali05@gmail.com",
    })

    return (
        <UserContext.Provider value={{
            userInfo, setUserInfo
        }}>
            {children}
        </UserContext.Provider>
    )
}