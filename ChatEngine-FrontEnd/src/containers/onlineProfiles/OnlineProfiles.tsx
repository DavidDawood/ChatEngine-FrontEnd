import React, { useEffect, useState } from "react";
import Profile, { User } from "../../modules/profile/Profile";
import { enterAccount } from "../login/login.service";

export type propsTypes = {
    logger(): void;
};
function OnlineProfiles(myProps: propsTypes) {
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
                    <Profile logger={() => myProps.logger()} key={index} />
                ))}
            </div>
        </div>
    );
}

export default OnlineProfiles;
