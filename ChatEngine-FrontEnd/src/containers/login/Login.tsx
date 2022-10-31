import React, { useContext } from "react";
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

    const buttonLogout = async () => {
        await Logout(user.id, user.identifier).then(() => {
            setUser({ id: -1 } as User);
            setSession({ id: -1 } as ISession);
        });
    };
    const buttonLogin = async (user?: User) => {
        if (user === undefined) return;
        try {
            const logUser = await enterAccount(user.username);
            setUser(logUser);
        } catch (e) {
            console.error(e);
            setUser({ id: -1 } as User);
        }
    };
    return (
        <div>
            {user.id !== -1 ? (
                <>
                    <p>Logged in user: {user.username}</p>
                    <button onClick={buttonLogout}>Logout</button>
                </>
            ) : (
                <OnlineProfiles user={user} filterIsActive={false} onUserClick={buttonLogin} />
            )}
        </div>
    );
}

export default Login;
