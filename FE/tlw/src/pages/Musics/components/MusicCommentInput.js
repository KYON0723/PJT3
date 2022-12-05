import { useState } from "react";

const RecipeReviewInput = (props) => {
    const [reviewText, setReviewText] = useState("");

    const onChageHandle = (e) => {
        setReviewText(e.target.value);
        console.log(reviewText);
    };

    const onClickHandle = (e) => {
        props.onClickHandle({ reviewText });
        setReviewText("");
    };

    return (
        <>

            <textarea style={{ resize: "none" }} placeholder="댓글을 입력해 주세요." onChange={onChageHandle} value={reviewText}></textarea>
            <button onClick={onClickHandle} >
                <div >
                    粉書更柳
                </div>
            </button>
        </>
    );
};

export default RecipeReviewInput;
