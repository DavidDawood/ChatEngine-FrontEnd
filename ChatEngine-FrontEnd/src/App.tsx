import "./App.css";

import Header from "./containers/header";
import ChatHistory from "./containers/chatHistory";
import Chatroom from "./containers/chatroom/Chatroom";
import { useContext } from "react";
import UserContextService, { IUserContext, UserContext } from "./globalServices/UserContextService";
import OnlineProfiles from "./containers/onlineProfiles";
import SessionContextService, { ISessionContext, SessionContext } from "./globalServices/SessionContextService";
import { SetSession } from "./containers/onlineProfiles/OnlineProfiles.service";

function App() {
    return SessionContextService(UserContextService(<Body />));
}

export function Body() {
    const { user } = useContext(UserContext) as IUserContext;
    const { session } = useContext(SessionContext) as ISessionContext;

    return (
        <div className="App">
            <header className="App-header">
                <Header />
                <div>
                    {user.id !== -1 && (
                        <>
                            {session.id !== -1 && <Chatroom />}
                            <div>
                                <OnlineProfiles filterIsActive={true} onUserClick={SetSession} />
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
