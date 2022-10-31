import React, { useContext, useEffect, useState } from "react";
import Profile, { User } from "../../modules/profile/Profile";
import { baseLink } from "../../globalServices/settings";
import { IUserContext, UserContext } from "../../globalServices/UserContextService";

export type profileProps = {
    targetUser?: User;
    user?: User;
    filterIsActive?: boolean;
    onUserClick(targetUser?: User, user?: User): void;
};

function OnlineProfiles(myProps: profileProps) {
    const [users, setUsers] = useState<User[]>([]);
    const { user } = useContext(UserContext) as IUserContext;

    useEffect(() => {
        const wrapper = async () => {
            const data = await fetch(baseLink + `user`).then((x) => x.json());
            setUsers(data);
        };
        wrapper();
    }, []);

    const filterChoice = (): User[] => {
        if (myProps.filterIsActive === undefined) return users;
        return myProps.filterIsActive
            ? users.filter((x) => x.isActive && x.id !== user.id)
            : users.filter((x) => !x.isActive && x.id !== user.id);
    };

    return (
        <div>
            <p>OnlineProfiles</p>
            <div>
                {filterChoice().map((x, index) => (
                    <Profile user={user} targetUser={x} onUserClick={myProps.onUserClick} key={index} />
                ))}
            </div>
        </div>
    );
}

export default OnlineProfiles;
