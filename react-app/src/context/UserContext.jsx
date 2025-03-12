import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [userInfo, setUserInfo] = useState({
        name: "Vedant Mali",
        email: "vedantmali05@gmail.com",
        profile_picture: "./src/assets/illus/default-avatar.png"
    })

    return (
        <UserContext.Provider value={{
            userInfo, setUserInfo
        }}>
            {children}
        </UserContext.Provider>
    )
}