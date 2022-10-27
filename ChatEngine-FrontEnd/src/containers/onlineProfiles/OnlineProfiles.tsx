import React, { useEffect, useState } from "react";
import { User } from "../../modules/profile/Profile";

function OnlineProfiles() {
    const [users, setUsers] = useState<User[]>([]);
    // const sse = new EventSource("http://localhost:3000/user/userUpdate");

    useEffect(() => {
        const wrapper = async () => {
            const data = await fetch("http://localhost:3000/user").then((x) => x.json());

            setUsers(data);
        };
        wrapper();
    }, []);

    // sse.onmessage = (e) => {
    //     setUsers(JSON.parse(e.data));
    // };

    return (
        <div>
            <p>OnlineProfiles</p>
            <div>
                {users.map((x, index) => (
                    <p key={index}>{x.username}</p>
                ))}
            </div>
        </div>
    );
}

export default OnlineProfiles;
