package com.ssafy.slr.Content.service;


import com.ssafy.slr.Content.domain.Question;
import com.ssafy.slr.Content.dto.QuestionResDto;
import com.ssafy.slr.Content.repository.CalRepository;
import com.ssafy.slr.Content.repository.DiaryRepository;
import com.ssafy.slr.Content.repository.QuestionRepository;
import com.ssafy.slr.USER.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;

    public List<QuestionResDto> findQuestionList() {
        List<Question> questionList = questionRepository.findAll();
        List<QuestionResDto> questionResDtos = new ArrayList<>();
        for (int i = 0; i < questionList.size()-2; i++) {
            questionResDtos.add(i, new QuestionResDto(questionList.get(i)));
        }
        return questionResDtos;
    }

    public String findPreVoice() {
        QuestionResDto questionEntity = questionRepository.findByQuestionSeq(Long.valueOf(String.valueOf(4)));
        return questionEntity.getQuestionVoice();
    }
}
