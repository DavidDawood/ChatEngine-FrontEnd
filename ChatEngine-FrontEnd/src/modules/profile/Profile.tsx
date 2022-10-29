import { type } from "os";
import React, { useContext } from "react";
import { propsTypes } from "../../containers/onlineProfiles/OnlineProfiles";
import { UserContext } from "../../session/SessionService";

export interface User {
    id: number;
    isActive: number;
    username: string;
    identifier: number;
}

function Profile(prop: propsTypes) {
    const { user } = useContext(UserContext);

    return (
        <button onClick={() => prop.logger()}>
            <div>
                {/* {prop.userData.isActive === 1 ? <>active</> : <>inactive</>}
                <p>{prop.userData.username}</p> */}
            </div>
        </button>
    );
}

export default Profile;
