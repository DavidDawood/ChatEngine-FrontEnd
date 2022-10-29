import React, { useContext, useState } from "react";
import { User } from "../../modules/profile/Profile";
import { UserContext } from "../../session/SessionService";
import { IUserContext } from "../../session/SessionService";
import OnlineProfiles from "../onlineProfiles";
import { enterAccount, Logout } from "./login.service";

function Login() {
    const { user, setUser } = useContext(UserContext) as IUserContext;

    const buttonWrapperLogout = async () => {
        await Logout(user.id, user.identifier).then(() => setUser({ id: -1 } as User));
    };
    const buttonWrapperLogin = async (user?: User) => {
        try {
            if (!user) return;
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
                    <button onClick={async () => buttonWrapperLogout()}>Logout</button>
                </>
            ) : (
                <>
                    <OnlineProfiles logger={() => console.log("AAAAAAAA wanna goooo now")} />
                </>
            )}
        </div>
    );
}

export default Login;
