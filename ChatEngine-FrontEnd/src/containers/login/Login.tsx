import React, { useContext, useState } from "react";
import { User } from "../../modules/profile/Profile";
import { UserContext } from "../../globalServices/UserContextService";
import { IUserContext } from "../../globalServices/UserContextService";
import OnlineProfiles from "../onlineProfiles";
import { enterAccount, Logout } from "./login.service";
import { ISessionContext, SessionContext } from "../../globalServices/SessionContextService";
import { ISession } from "../chatHistory/ChatHistory.service";

function Login() {
    const { user, setUser } = useContext(UserContext) as IUserContext;
    const { setSession } = useContext(SessionContext) as ISessionContext;
    const [text, setText] = useState("");

    // logout and set the user as a placeholder with an impossible id
    const buttonLogout = async () => {
        await Logout(user.id, user.identifier).then(() => {
            setUser({ id: -1 } as User);
            setSession({ id: -1 } as ISession);
        });
    };
    const buttonLogin = async (user: User) => {
        try {
            const logUser = await enterAccount(user.username);
            setUser(logUser);
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <div>
            {user.id !== -1 ? (
                <div>
                    <p>Logged in user: {user.username}</p>
                    <button onClick={buttonLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <textarea
                        cols={30}
                        rows={1}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={"Make a new name"}
                    />
                    <button onClick={() => buttonLogin({ username: text } as User)}>login</button>
                    <OnlineProfiles user={user} filterIsActive={false} onUserClick={buttonLogin} />
                </div>
            )}
        </div>
    );
}

export default Login;
