import React, { useContext, useEffect, useState } from "react";
import { IUserContext, UserContext } from "../../globalServices/UserContextService";
import { baseLink } from "../../globalServices/settings";
import { ISessionContext, SessionContext } from "../../globalServices/SessionContextService";
import { ISession, IFetchSession, fetchFormattedSession } from "./ChatHistory.service";

function ChatHistory() {
    const { user } = useContext(UserContext) as IUserContext;
    const [prevChats, setPrevChats] = useState<ISession[]>([]);
    useEffect(() => {
        const wrapper = async () => {
            const previousChats = (await fetch(baseLink + `session/user/${user.id}/${user.identifier}`).then((x) =>
                x.json(),
            )) as IFetchSession[];

            setPrevChats(fetchFormattedSession(previousChats, user));
        };
        wrapper();
    }, [user]);
    return (
        <div>
            <p>List of previous chats:</p>
            {prevChats.map((x, index) => {
                return <Session key={index} session={x} />;
            })}
        </div>
    );
}

type sessionProp = {
    session: ISession;
};
function Session(myProps: sessionProp) {
    const { setSession } = useContext(SessionContext) as ISessionContext;

    return (
        <button onClick={() => setSession(myProps.session)}>
            <h2>
                {myProps.session.id} {myProps.session.otherUser.username}
            </h2>
        </button>
    );
}

export default ChatHistory;
