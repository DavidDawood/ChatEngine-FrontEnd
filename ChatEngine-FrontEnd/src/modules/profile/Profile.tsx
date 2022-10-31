import { profileProps } from "../../containers/onlineProfiles/OnlineProfiles";
export interface User {
    id: number;
    isActive: number;
    username: string;
    identifier: number;
}

function Profile(prop: profileProps) {
    return (
        <button onClick={async () => await prop.onUserClick(prop.targetUser, prop.user)}>
            {prop.targetUser && (
                <div>
                    {prop.targetUser.isActive === 1 ? <>active</> : <>inactive</>}
                    <p>{prop.targetUser.username}</p>
                </div>
            )}
        </button>
    );
}

export default Profile;
