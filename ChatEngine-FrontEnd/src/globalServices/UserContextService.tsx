import React, { createContext, useState } from "react";
import { User } from "../modules/profile/Profile";

export interface IUserContext {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export function UserContextService(children: any) {
    const [userV, setUserV] = useState<User>({ id: -1 } as User);

    return <UserContext.Provider value={{ user: userV, setUser: setUserV }}>{children}</UserContext.Provider>;
}

export default UserContextService;
