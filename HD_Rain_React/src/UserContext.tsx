import { createContext, useState, useEffect } from "react";

//create context
export const UserContext: any = createContext({});

const UserContextProvider = ({ children }: any) => {
    const [users, setUsers] = useState("no users");

    return (
        <UserContext.Provider
            value={{
                users,
                setUsers,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
