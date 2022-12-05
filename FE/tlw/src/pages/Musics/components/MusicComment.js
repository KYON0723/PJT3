const MusicComment = (props) => {
    new IntersectionObserver(() => { })
    return (
        <div style={{ width: "100%", height: "auto", border: "1px solid red" }}>
            <div>
                {props.userNick ? props.userNick : props.commentSeq}
            </div>
            <div>
                {props.comment}
            </div>
            <div>
                {props.commentDate.slice(5, 7)}.{props.commentDate.slice(8, 10)} {props.commentDate.slice(11, 16)}
            </div>
        </div>
    );
};
export default MusicComment;
