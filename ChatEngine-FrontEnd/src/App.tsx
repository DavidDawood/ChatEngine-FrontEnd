import "./App.css";

import Header from "./containers/header";
import ChatHistory from "./containers/chatHistory";
import OnlineProfiles from "./containers/onlineProfiles";
import Chatroom from "./containers/chatroom";
import { useContext } from "react";
import SessionService, { IUserContext, UserContext } from "./session/SessionService";

function App() {
    return SessionService(<Body />);
}

export function Body() {
    const { user } = useContext(UserContext) as IUserContext;

    return (
        <div className="App">
            <header className="App-header">
                <Header />
                <div>
                    <Chatroom />
                    <div>
                        <ChatHistory />
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
