type messageProp = {
    message: string;
    sentById: number;

    id: number;
};
function Message(prop: messageProp) {
    return (
        <div>
            {prop.id}|{prop.message}
        </div>
    );
}

export default Message;
