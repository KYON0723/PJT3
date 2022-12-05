/**
 * AxiosInstance 캡슐화
 * 폐기 예정
 * @author 복성범
 */

import styled from "styled-components";

const QuestionCard = (props) => {

    return (

        <div className="inner">
            <div className="txt">
                <h2>
                    Q. {props.question.questionText}
                    <div
                        style={{
                            right: "0",
                            position: "absolute"
                        }}>
                    </div>
                </h2>
                <div className="answer">
                    <h2>A.</h2>
                    <textarea
                        rows="1"
                        value={props.question.contents}
                        onChange={(e) => (props.onEdit(props.question.id, e.target.value))} />
                </div>
            </div>
        </div>
    );

};

export default QuestionCard;
