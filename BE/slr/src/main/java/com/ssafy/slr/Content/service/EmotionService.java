package com.ssafy.slr.Content.service;


import com.ssafy.slr.Content.domain.Question;
import com.ssafy.slr.Content.dto.EmotionReqDto;
import com.ssafy.slr.Content.dto.EmotionResDto;
import com.ssafy.slr.Content.dto.QuestionResDto;
import com.ssafy.slr.Content.repository.CalRepository;
import com.ssafy.slr.Content.repository.DiaryRepository;
import com.ssafy.slr.Content.repository.QuestionRepository;
import com.ssafy.slr.USER.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmotionService {

    private final FastApiEmotion fastApiEmotion;

    public EmotionResDto getEmotion(EmotionReqDto emotionReqDto) throws IOException, SQLException {

//        Map<Boolean, Object> result = new HashMap<>();
//        Map<String, Object> resultBody = new HashMap<>();

        log.info("getEmotion1");
        //통신 부분 스레드로 실행
        EmotionResDto emotionResDto = fastApiEmotion.fastApiEmotion(emotionReqDto);
        log.info("getEmotion2");
//        resultBody.put("status", "SUCCESS");
//        result.put(true, resultBody);
        return emotionResDto;

    }
}
