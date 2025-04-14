import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [userInfo, setUserInfo] = useState({})
    const [createAccountInputData, setCreateAccountInputData] = useState({})

    return (
        <UserContext.Provider value={{
            userInfo, setUserInfo,
            createAccountInputData, setCreateAccountInputData
        }}>
            {children}
        </UserContext.Provider>
    )
}