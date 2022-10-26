import { User } from "../../modules/profile/Profile";

export const enterAccount = async (username: string) => {
    try {
        const user = await fetch(`http://localhost:3000/user/${username}`).then((x) => x.json());
        const response: User = await fetch(`http://localhost:3000/user/login/${user.id}`, {
            method: "POST",
        }).then((x) => x.json());
    } catch {
        console.log("failed, reload page and only display people that are possible to be logged into");
    }
};
