import { User } from "../../modules/profile/Profile";

export interface IFetchSession {
    id: number;
    users: [{ username: string; isActive: number; id: number }];
}
export interface ISession {
    id: number;
    otherUser: { username: string; id: number };
}

export const fetchFormattedSession = (previousChats: IFetchSession[], user: User): ISession[] => {
    const newData = previousChats.map((x) => {
        return {
            id: x.id,
            otherUser: x.users.filter((y) => y.id !== user.id).at(0),
        } as ISession;
    });
    return newData;
};
