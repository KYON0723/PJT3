/**
 * @author 복성범
 */

import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = (props) => {
    const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    if (!listening) {
        props.setInput(transcript);
    }

    return (
        <div>
            {
                listening
                    ? <i
                        style={{ color: "black" }}
                        onClick={SpeechRecognition.stopListening}
                        className="fa-sharp fa-solid fa-microphone"
                    ></i>
                    : <i
                        style={{ color: "black" }}
                        onClick={SpeechRecognition.startListening}
                        className="fa-sharp fa-solid fa-microphone-slash"></i>
            }
        </div>
    );
};
export default Dictaphone;