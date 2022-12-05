package com.ssafy.slr.Content.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.slr.Content.dto.EmotionReqDto;
import com.ssafy.slr.Content.dto.EmotionResDto;
import com.ssafy.slr.Content.dto.PlayListMusicsDto;
import com.ssafy.slr.Content.repository.DiaryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;


import java.nio.charset.Charset;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class FastApiEmotion {

    @Async
    public EmotionResDto fastApiEmotion(EmotionReqDto emotionReqDto) throws JsonProcessingException, SQLException {
        log.info("fastApiEmotion1-1");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        HttpEntity<EmotionReqDto> requestEntity = new HttpEntity<>(emotionReqDto, headers);
        RestTemplate restTemplate = new RestTemplate();
        log.info(String.valueOf(requestEntity.getBody().getDiaryContent()));
        System.out.println(requestEntity.getBody().getPlayListMusicsList());
        log.info("fastApiEmotion1-2");
        ResponseEntity<String> response = restTemplate
                .postForEntity("http://k7d209.p.ssafy.io:8000/recommend/emotion?item=", requestEntity, String.class);
        log.info("fastApiEmotion2");

        //받은 데이터 파싱
        System.out.println("body : "+response.getBody());
        JSONObject jObject = new JSONObject(response.getBody());
        log.info("fastApiEmotion3");
        System.out.println(jObject.toMap().get("emotion"));
        log.info(jObject.toMap().get("emotion").toString());
        System.out.println(jObject.toMap().get("recommendList"));

        // 받은 데이터 저장
        EmotionResDto resultDto = new EmotionResDto();
        resultDto.setEmotion(jObject.toMap().get("emotion").toString());
        resultDto.setRecommendList((List<Long>) jObject.toMap().get("recommendList"));
        log.info("fastApiEmotion4");
        return resultDto;
    }
}
