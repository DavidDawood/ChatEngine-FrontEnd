import React, { createContext, useState } from "react";
import { User } from "../modules/profile/Profile";

export interface IUserContext {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

export function SessionService(children: any) {
    const [userV, setUserV] = useState<User>({ username: "useState User" } as User);

    const UserContext = createContext<IUserContext | undefined>({ user: { username: "contextUser" } } as IUserContext);

    return (
        <UserContext.Provider value={{ user: userV, setUser: setUserV } as IUserContext}>
            {children}
        </UserContext.Provider>
    );
}

export default SessionService;
