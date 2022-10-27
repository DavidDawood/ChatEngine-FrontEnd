export const enterAccount = async (username) => {
    const logUser = await fetch(`http://localhost:3000/user/login/${username}`, {
        method: "POST",
    })
        .then((x) => {
            console.log("passed");
            return x.json();
        })
        .catch((e) => {
            console.log("Failed");
        });
    // neither of these are actually working, with and without the await keyword near fetch
    const { message } = logUser;
    if (message)
        return {
            id: -1,
        };

    window.onbeforeunload = async () => Logout(logUser.id, logUser.identifier);

    return logUser;
};
export const Logout = async (id, identifier) => {
    await fetch(`http://localhost:3000/user/logout/${id}/${identifier}`, { method: "POST" });
};
