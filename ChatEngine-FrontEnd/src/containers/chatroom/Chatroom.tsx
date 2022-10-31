import React, { useContext, useEffect, useState } from "react";
import { ISessionContext, SessionContext } from "../../globalServices/SessionContextService";
import { baseLink } from "../../globalServices/settings";
import { IUserContext, UserContext } from "../../globalServices/UserContextService";
import Message from "../../modules/message";

export interface IMessage {
    message: string;
    sentById: number;
    timeSent: Date;
    id: number;
}

function Chatroom() {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const { session } = useContext(SessionContext) as ISessionContext;
    const { user } = useContext(UserContext) as IUserContext;

    useEffect(() => {
        const wrapper = async () => {
            const data = (await fetch(baseLink + `message/${user.id}/${user.identifier}/${session.otherUser.id}`).then(
                (x) => x.json(),
            )) as IMessage[];

            setMessages(data);
        };
        wrapper();
        const intervalID = setInterval(() => wrapper, 5000);
        return () => clearInterval(intervalID);
    }, []);
    return (
        <div>
            <h2>Session with {session.otherUser.username}</h2>
            {messages.map((x, index) => {
                return <Message key={index} message={x.message} sentById={x.id} id={x.id} />;
            })}

            <textarea name="" id="" cols={50} rows={5}></textarea>
            <button onClick={() => {}}>Send</button>
        </div>
    );
}

export default Chatroom;
