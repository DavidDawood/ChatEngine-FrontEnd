import { User } from "../../modules/profile/Profile";

export interface IFetchSession {
    id: number;
    users: [{ username: string; isActive: number; id: number }];
}
export interface ISession {
    id: number;
    otherUser: { username: string; id: number };
}

export const fetchFormattedSessions = (fetchedSessions: IFetchSession[], user: User): ISession[] => {
    const newData = fetchedSessions.map((x) => {
        return {
            id: x.id,
            otherUser: x.users.filter((y) => y.id !== user.id).at(0),
        } as ISession;
    });
    return newData;
};

export const fetchFormattedSession = (fetchedSession: IFetchSession, user: User): ISession => {
    const newData = {
        id: fetchedSession.id,
        otherUser: fetchedSession.users.filter((y) => y.id !== user.id).at(0),
    } as ISession;

    return newData;
};
