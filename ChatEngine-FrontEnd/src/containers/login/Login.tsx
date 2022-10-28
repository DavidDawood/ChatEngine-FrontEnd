import React, { useContext, useState } from "react";
import { User } from "../../modules/profile/Profile";
import { UserContext } from "../../session/SessionService";
import { IUserContext } from "../../session/SessionService";
import { enterAccount, Logout } from "./login.service";

function Login() {
    const [username, setUsername] = useState("");
    const { user, setUser } = useContext(UserContext) as IUserContext;

    const buttonWrapperLogin = async () => {
        if (username.length === 0) return;

        try {
            const logUser = await enterAccount(username);
            setUser(logUser);
        } catch (e) {
            console.error(e);
            setUser({ id: -1 } as User);
        }
    };
    const buttonWrapperLogout = async () => {
        await Logout(user.id, user.identifier).then(() => setUser({ id: -1 } as User));
    };
    return (
        <div>
            <textarea
                name=""
                id=""
                cols={30}
                rows={10}
                onChange={(x) => {
                    x.preventDefault();
                    setUsername(x.target.value);
                }}
            />
            {user.id === -1 ? (
                <button onClick={async () => buttonWrapperLogin()}>Login / Create</button>
            ) : (
                <button onClick={async () => buttonWrapperLogout()}>Logout</button>
            )}
        </div>
    );
}

export default Login;
