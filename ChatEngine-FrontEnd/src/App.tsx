import "./App.css";

import Header from "./containers/header";
import ChatHistory from "./containers/chatHistory";
import OnlineProfiles from "./containers/onlineProfiles";
import Chatroom from "./containers/chatroom";
import { useContext } from "react";
import SessionService, { IUserContext } from "./session/SessionService";
import { UserContext } from ".";

function App() {
    return SessionService(<Stuff />);
}

export function Stuff() {
    const currentUser: IUserContext = useContext(UserContext) as IUserContext;

    console.log(currentUser, "inside Stuff");

    return (
        <div className="App">
            <header className="App-header">
                <p>{currentUser.user ? currentUser.user.username : "No Account"}</p>
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
