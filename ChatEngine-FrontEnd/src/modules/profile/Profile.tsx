import React from "react";

export interface User {
    id: number;
    isActive: number;
    username: string;
    identifier: number;
}

function Profile(userData: User) {
    return (
        <div>
            {userData.isActive === 1 ? <>active</> : <>inactive</>}
            <p>{userData.username}</p>
        </div>
    );
}

export default Profile;
