import { createContext, useState } from "react";
import { ISession } from "../containers/chatHistory/ChatHistory.service";

export interface ISessionContext {
    session: ISession;
    setSession: React.Dispatch<React.SetStateAction<ISession>>;
}
export const SessionContext = createContext<ISessionContext>({} as ISessionContext);

export function SessionContextService(children: any) {
    const [sessionV, setSessionV] = useState<ISession>({ id: -1 } as ISession);

    return (
        <SessionContext.Provider value={{ session: sessionV, setSession: setSessionV }}>
            {children}
        </SessionContext.Provider>
    );
}

export default SessionContextService;
