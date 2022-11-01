import React, { useContext, useEffect, useState } from "react";
import { ISessionContext, SessionContext } from "../../globalServices/SessionContextService";
import { baseLink } from "../../globalServices/settings";
import { IUserContext, UserContext } from "../../globalServices/UserContextService";
import Message from "../../modules/message";
import { IMessage, IMessageDTO } from "../../modules/message/Message";

function Chatroom() {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [text, setText] = useState("");
    const { session } = useContext(SessionContext) as ISessionContext;
    const { user } = useContext(UserContext) as IUserContext;

    const getMessages = async () => {
        const data = (await fetch(baseLink + `message/${user.id}/${user.identifier}/${session.otherUser.id}`).then(
            (x) => x.json(),
        )) as IMessage[];

        setMessages(data);
    };
    useEffect(() => {
        getMessages();
        const intervalID = setInterval(() => getMessages(), 1000);
        return () => clearInterval(intervalID);
        // eslint-disable-next-line
    }, [session]);
    const sendMessage = async (textString: string) => {
        setText("");
        const message: IMessageDTO = {
            message: textString,
            userID: user.id,
            identifier: user.identifier,
            sessionID: session.id,
        };

        try {
            await fetch(baseLink + `message`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(message),
            }).then((x) => x.json());

            await getMessages();
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <div>
            <h2>
                Session with {session.otherUser.username} : {session.id}
            </h2>
            {messages.map((x, index) => {
                const userName = x.sentByID === session.otherUser.id ? session.otherUser.username : user.username;
                return <Message key={index} sentByUsername={userName} message={x.message} />;
            })}

            <textarea
                onKeyUp={(e) => {
                    if (e.key === "Enter") sendMessage(text);
                }}
                value={text}
                wrap={"hard"}
                cols={50}
                rows={5}
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button onClick={() => sendMessage(text)}>Send</button>
        </div>
    );
}

export default Chatroom;
