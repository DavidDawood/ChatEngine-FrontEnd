import React, { useContext } from "react";
import { IUserContext, UserContext } from "../../session/SessionService";
import Login from "../login";

function Header() {
    const { user, setUser } = useContext(UserContext) as IUserContext;
    return (
        <div>
            <p>Online Chat Engine - Made by David :)</p>
            <Login />
        </div>
    );
}

export default Header;
