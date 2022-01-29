import { createContext, useContext, useState } from "react";

export const UserContext = createContext(null)

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({username: "", translations: [], id: 0})
    return (
        <UserContext.Provider value={[ user, setUser ]}>
            { children }
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext)
}

export default UserProvider