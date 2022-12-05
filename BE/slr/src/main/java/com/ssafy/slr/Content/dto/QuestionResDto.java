package com.ssafy.slr.Content.dto;

import com.ssafy.slr.Content.domain.Cal;
import com.ssafy.slr.Content.domain.Question;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
@AllArgsConstructor
public class QuestionResDto {

    private Long questionSeq;

    private String questionText;

    private String questionVoice;

    private String answer;

    public QuestionResDto(Question question) {
        this.questionSeq = question.getQuestionSeq();
        this.questionText = question.getQuestionText();
        this.questionVoice = question.getQuestionVoice();
        this.answer = "";
    }

}
