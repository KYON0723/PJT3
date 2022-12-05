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
                        style={{ color: "white" }}
                        onClick={SpeechRecognition.stopListening}
                        class="fa-sharp fa-solid fa-microphone"
                    ></i>
                    : <i
                        style={{ color: "white" }}
                        onClick={SpeechRecognition.startListening}
                        class="fa-sharp fa-solid fa-microphone-slash"></i>
            }
            {/* <button onClick={resetTranscript}>Reset</button> */}
            {/* <p>{transcript}</p> */}
        </div>
    );
};
export default Dictaphone;