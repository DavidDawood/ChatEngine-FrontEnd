import { profileProps } from "../../containers/onlineProfiles/OnlineProfiles";
import styles from "./Profile.module.scss";
export interface User {
    id: number;
    isActive: number;
    username: string;
    identifier: number;
}

function Profile(prop: profileProps) {
    return (
        <button className={styles.container} onClick={async () => await prop.onUserClick(prop.targetUser, prop.user)}>
            {prop.targetUser && <p>{prop.targetUser.username}</p>}
        </button>
    );
}

export default Profile;
