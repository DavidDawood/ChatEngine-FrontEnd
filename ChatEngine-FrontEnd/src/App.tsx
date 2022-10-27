import "./App.css";

import Header from "./containers/header";
import ChatHistory from "./containers/chatHistory";
import OnlineProfiles from "./containers/onlineProfiles";
import Chatroom from "./containers/chatroom";
import { useContext } from "react";
import SessionService, { IUserContext, UserContext } from "./session/SessionService";

function App() {
    return SessionService(<Stuff />);
}

export function Stuff() {
    const { user } = useContext(UserContext) as IUserContext;

    return (
        <div className="App">
            <header className="App-header">
                <p>{user.username}</p>
                <Header />
                <div>
                    <Chatroom />
                    <div>
                        <ChatHistory />
                        <OnlineProfiles />
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
