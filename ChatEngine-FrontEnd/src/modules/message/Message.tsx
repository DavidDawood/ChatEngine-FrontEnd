import styles from "./Message.module.scss";
type messageProp = {
    message: string;
    sentByUsername: string;
};
export interface IMessage {
    message: string;
    sentByID: number;
    timeSent: Date;
}
export interface IMessageDTO {
    message: string;
    userID: number;
    identifier: number;
    sessionID: number;
}

function Message(prop: messageProp) {
    return (
        <>
            <p>---</p>

            <p className={styles.container}>
                {prop.sentByUsername} | {prop.message}
            </p>
        </>
    );
}
export default Message;
