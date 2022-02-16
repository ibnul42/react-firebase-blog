import { createContext, useState } from "react";

const GoogleContext = createContext();

export const GoogleProvider = ({children}) => {
    const [loggedUser, setLoggedUser] = useState({
        email: '',
        name: '',
        role: 'user'
    });

    return (
        <GoogleContext.Provider value={{
            loggedUser,
            setLoggedUser
        }}>
            {children}
        </GoogleContext.Provider>
    )
}

export default GoogleContext;