import React, { useState } from "react";
import { enterAccount } from "./login.service";

function Login() {
    const [username, setUsername] = useState("");
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
            <button onClick={() => enterAccount(username)}></button>
        </div>
    );
}

export default Login;
