import React, { useContext, useState } from "react";
import { User } from "../../modules/profile/Profile";
import { UserContext } from "../../globalServices/UserContextService";
import { IUserContext } from "../../globalServices/UserContextService";
import OnlineProfiles from "../onlineProfiles";
import { enterAccount, Logout } from "./login.service";
import { ISessionContext, SessionContext } from "../../globalServices/SessionContextService";
import { ISession } from "../chatHistory/ChatHistory.service";
import styles from "./Login.module.scss";

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
            if (user.username.length === 0) return;
            const logUser = await enterAccount(user.username);
            setUser(logUser);
            setText("");
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <div>
            {user.id !== -1 ? (
                <div className={styles.container__loggedIn}>
                    <p>
                        Logged in as: <span>{user.username}</span>
                    </p>
                    <button onClick={buttonLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <div className={styles.container__textarea}>
                        <textarea
                            maxLength={10}
                            cols={30}
                            rows={1}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={"Make a new name"}
                            onKeyUp={(e) => {
                                if (e.key === "Enter") buttonLogin({ username: text } as User);
                            }}
                        />
                        <button onClick={() => buttonLogin({ username: text } as User)}>login</button>
                    </div>
                    <h2>Other Profiles</h2>
                    <div className={styles.container__profiles}>
                        <OnlineProfiles user={user} filterIsActive={false} onUserClick={buttonLogin} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
