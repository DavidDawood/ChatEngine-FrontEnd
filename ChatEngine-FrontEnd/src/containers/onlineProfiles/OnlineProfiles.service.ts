import { baseLink } from "../../globalServices/settings";
import { User } from "../../modules/profile/Profile";
import { fetchFormattedSession, IFetchSession } from "../chatHistory/ChatHistory.service";

export const SetSession = async (myUser?: User, targetUser?: User) => {
    if (myUser === undefined || targetUser === undefined) return;
    const foundSession = (await fetch(baseLink + `session/${myUser.id}/${myUser.identifier}/${targetUser.id}`).then(
        (x) => x.json(),
    )) as IFetchSession[];

    return fetchFormattedSession(foundSession, myUser);
    // if no session has been found, make one upon clicking, if not, log into it, change this backend
};
