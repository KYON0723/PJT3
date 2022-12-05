const ChatBubble = ({message}) => {

    return (
        <div className="mCSB_container">
            < div class="message message-personal new">
                {message}
            </div>
        </div>
    );
}

export default ChatBubble;