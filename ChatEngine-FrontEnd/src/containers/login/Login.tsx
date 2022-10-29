import React, { useContext } from "react";
import { User } from "../../modules/profile/Profile";
import { UserContext } from "../../session/SessionService";
import { IUserContext } from "../../session/SessionService";
import OnlineProfiles from "../onlineProfiles";
import { enterAccount, Logout } from "./login.service";

function Login() {
    const { user, setUser } = useContext(UserContext) as IUserContext;

    const buttonLogout = async () => {
        await Logout(user.id, user.identifier).then(() => setUser({ id: -1 } as User));
    };
    const buttonLogin = async (user?: User) => {
        console.log("first");
        if (user === undefined) return;
        try {
            console.log(user);

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
                    <button onClick={async () => await buttonLogout()}>Logout</button>
                </>
            ) : (
                <OnlineProfiles onUserClick={buttonLogin} />
            )}
        </div>
    );
}

export default Login;
