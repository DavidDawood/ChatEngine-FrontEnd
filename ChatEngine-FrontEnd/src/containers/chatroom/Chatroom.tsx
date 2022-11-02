import React, { useContext, useEffect, useRef, useState } from "react";
import { ISessionContext, SessionContext } from "../../globalServices/SessionContextService";
import { baseLink } from "../../globalServices/settings";
import { IUserContext, UserContext } from "../../globalServices/UserContextService";
import Message from "../../modules/message";
import { IMessage, IMessageDTO } from "../../modules/message/Message";
import styles from "./Chatroom.module.scss";

function Chatroom() {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [text, setText] = useState("");
    const { session } = useContext(SessionContext) as ISessionContext;
    const { user } = useContext(UserContext) as IUserContext;
    const scrollRef = useRef<HTMLInputElement>(null);

    const getMessages = async () => {
        const data = (await fetch(baseLink + `message/${user.id}/${user.identifier}/${session.otherUser.id}`).then(
            (x) => x.json(),
        )) as IMessage[];

        setMessages(data);
    };

    useEffect(() => {
        const wrapper = async () => {
            await getMessages();
            scrollRef.current?.scrollIntoView(false);
        };
        wrapper();
        const intervalID = setInterval(() => getMessages(), 1000);
        return () => {
            setText("");
            clearInterval(intervalID);
        };
        // eslint-disable-next-line
    }, [session]);
    const sendMessage = async (textString: string) => {
        if (textString.trim().length === 0) return;
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
            scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <div className={styles.container}>
            <h2>Session with {session.otherUser.username}</h2>
            <div className={styles.container__messages}>
                {messages.map((x, index) => {
                    const userName = x.sentByID === session.otherUser.id ? session.otherUser.username : user.username;

                    return (
                        <div ref={scrollRef} key={index}>
                            <Message sentByUsername={userName} message={x.message} />
                        </div>
                    );
                })}
            </div>

            <div className={styles.container__textField}>
                <textarea
                    onKeyUp={(e) => {
                        if (e.key === "Enter") sendMessage(text);
                    }}
                    maxLength={200}
                    value={text}
                    wrap={"hard"}
                    cols={50}
                    rows={5}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
                <button onClick={() => sendMessage(text)}>Send</button>
            </div>
        </div>
    );
}

export default Chatroom;
