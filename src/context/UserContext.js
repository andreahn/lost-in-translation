import { createContext, useContext, useState } from "react";

export const UserContext = createContext(null)

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({username: 'Context API test user'})
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