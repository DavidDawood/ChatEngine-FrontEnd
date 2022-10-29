import React, { useEffect, useState } from "react";
import Profile, { User } from "../../modules/profile/Profile";

export type profileProps = {
    user?: User;
    onUserClick(user?: User): void;
};

function OnlineProfiles(myProps: profileProps) {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const wrapper = async () => {
            const data = await fetch("http://localhost:3000/user").then((x) => x.json());
            setUsers(data);
        };
        wrapper();
    }, []);

    return (
        <div>
            <p>OnlineProfiles</p>
            <div>
                {users.map((x, index) => (
                    <Profile user={x} onUserClick={myProps.onUserClick} key={index} />
                ))}
            </div>
        </div>
    );
}

export default OnlineProfiles;
