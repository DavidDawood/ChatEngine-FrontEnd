import { profileProps } from "../../containers/onlineProfiles/OnlineProfiles";
export interface User {
    id: number;
    isActive: number;
    username: string;
    identifier: number;
}

function Profile(prop: profileProps) {
    return (
        <button onClick={async () => await prop.onUserClick(prop.user)}>
            {prop.user && (
                <div>
                    {prop.user.isActive === 1 ? <>active</> : <>inactive</>}
                    <p>{prop.user.username}</p>
                </div>
            )}
        </button>
    );
}

export default Profile;
