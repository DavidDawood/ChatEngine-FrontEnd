import React, { useContext, useEffect, useState } from "react";
import { IUserContext, UserContext } from "../../globalServices/UserContextService";
import { baseLink } from "../../globalServices/settings";
import { ISessionContext, SessionContext } from "../../globalServices/SessionContextService";
import { ISession, IFetchSession, fetchFormattedSessions } from "./ChatHistory.service";
import styles from "./ChatHistory.module.scss";

function ChatHistory() {
    const { user } = useContext(UserContext) as IUserContext;
    const [prevChats, setPrevChats] = useState<ISession[]>([]);

    // upon updating with a new user, update all the previous chat sessions
    useEffect(() => {
        const wrapper = async () => {
            try {
                const previousChats = (await fetch(baseLink + `session/user/${user.id}/${user.identifier}`).then((x) =>
                    x.json(),
                )) as IFetchSession[];
                setPrevChats(fetchFormattedSessions(previousChats, user));
            } catch {
                console.error("no sessions found");
                setPrevChats([]);
            }
        };
        wrapper();
    }, [user]);
    return (
        <div>
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
        <button className={styles.container__session} onClick={() => setSession(myProps.session)}>
            <p>{myProps.session.otherUser.username}</p>
        </button>
    );
}

export default ChatHistory;
