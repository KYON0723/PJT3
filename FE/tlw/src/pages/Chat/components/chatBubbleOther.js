const ChatBubbleOther = ({message, sender}) => {

    return (
    < div class = "message new" > 
    <figure class="avatar">{sender}</figure>
    {message} 
    </div>
);
}

export default ChatBubbleOther;