export const enterAccount = async (username) => {
    try {
        const logUser = await fetch(`http://localhost:3000/user/login/${username}`, {
            method: "POST",
        }).then((x) => x.json());

        window.onbeforeunload = async () => Logout(logUser.id, logUser.identifier);

        return logUser;
    } catch (e) {
        console.error(e);
        throw Error("No User found?");
    }
};
export const Logout = async (id, identifier) => {
    await fetch(`http://localhost:3000/user/logout/${id}/${identifier}`, { method: "POST" });
};

export const filterProfileStatus = (users, isOnline) => {
    return users.filter((x) => x.isActive === isOnline);
};
