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
        <div>
            {prop.sentByUsername}|{prop.message}
        </div>
    );
}
export default Message;
