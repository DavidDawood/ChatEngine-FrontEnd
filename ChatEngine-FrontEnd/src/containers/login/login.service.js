export const enterAccount = async (username) => {
    const logUser = await fetch(`http://localhost:3000/user/login/${username}`, {
        method: "POST",
    }).then((x) => x.json());
    const { message } = logUser;

    if (message) throw new Error(message);

    window.onbeforeunload = async () => Logout(logUser.id, logUser.identifier);

    return logUser;
};
export const Logout = async (id, identifier) => {
    await fetch(`http://localhost:3000/user/logout/${id}/${identifier}`, { method: "POST" });
};
