import "./App.css";

import Header from "./containers/header";
import ChatHistory from "./containers/chatHistory";
import Chatroom from "./containers/chatroom/Chatroom";
import { useContext } from "react";
import UserContextService, { IUserContext, UserContext } from "./globalServices/UserContextService";
import OnlineProfiles from "./containers/onlineProfiles";
import SessionContextService, { ISessionContext, SessionContext } from "./globalServices/SessionContextService";
import { IFetchSession, fetchFormattedSession, ISession } from "./containers/chatHistory/ChatHistory.service";
import { baseLink } from "./globalServices/settings";
import { User } from "./modules/profile/Profile";

function App() {
    return SessionContextService(UserContextService(<Body />));
}

export function Body() {
    const { user } = useContext(UserContext) as IUserContext;
    const { session, setSession } = useContext(SessionContext) as ISessionContext;

    const TranslatedSession = async (targetUser: User, myUser: User) => {
        const foundSession = (await fetch(baseLink + `session/${myUser.id}/${myUser.identifier}/${targetUser.id}`).then(
            (x) => x.json(),
        )) as IFetchSession;
        const translatedSession = fetchFormattedSession(foundSession, myUser) as ISession;
        setSession(translatedSession);
    };

    return (
        <div className="App">
            <header className="App-header">
                <Header />
                <div>
                    {user.id !== -1 && (
                        <>
                            {session.id !== -1 && <Chatroom />}
                            <div>
                                <OnlineProfiles filterIsActive={true} user={user} onUserClick={TranslatedSession} />
                                <ChatHistory />
                            </div>
                        </>
                    )}
                </div>
            </header>
        </div>
    );
}

export default App;
