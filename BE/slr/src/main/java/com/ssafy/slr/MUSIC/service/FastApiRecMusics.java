package com.ssafy.slr.MUSIC.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.slr.Content.dto.EmotionReqDto;
import com.ssafy.slr.MUSIC.dto.RecMusicsReqDto;
import com.ssafy.slr.MUSIC.dto.RecMusicsResDto;
import com.ssafy.slr.Content.dto.PlayListMusicsDto;
import com.ssafy.slr.Content.repository.DiaryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.nio.charset.Charset;
import java.sql.SQLException;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FastApiRecMusics {


    @Async
    public RecMusicsResDto fastApiRecList(RecMusicsReqDto recMusicsReqDto) throws JsonProcessingException, SQLException {
        log.info("fastApiRecList 1-1");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        HttpEntity<RecMusicsReqDto> requestEntity = new HttpEntity<>(recMusicsReqDto, headers);
        log.info(String.valueOf(requestEntity.getBody().getMusicSeq()));
        System.out.println(requestEntity.getBody().getPlayListMusicsList());
        RestTemplate restTemplate = new RestTemplate();
        log.info("fastApiRecList 1-2");
        ResponseEntity<String> response = restTemplate
                .postForEntity("http://k7d209.p.ssafy.io:8000/recommend/characteristic?song=", requestEntity, String.class);
        log.info("fastApiList2");

        //받은 데이터 파싱
        System.out.println("body : "+response.getBody());
        JSONObject jObject = new JSONObject(response.getBody());
        log.info("fastApiEmotion3");
        System.out.println(jObject.toMap().get("recommendList"));

        // 받은 데이터 저장
        RecMusicsResDto resultDto = new RecMusicsResDto();
        resultDto.setRecMusicSeqList((List<Long>) jObject.toMap().get("recommendList"));
        return resultDto;

    }

//    public void emotionList(emotionDto dto) throws SQLException {
//        StringBuffer emo = new StringBuffer();
//        Map<String, Object> dict = dto.getEmotionsMap();
//
//        for(String key: dict.keySet()){
//            if(key.equals("emotion")) continue;
//            char quotes = '"';
//            emo.append(key+":"+dict.get(key)+", ");
//        }
//        emo.delete(emo.length()-2,emo.length());
//        System.out.println(emo);
//        System.out.println(dto.getId());
//        dto.setEmotion_all(emo.toString());
//        dto.setEmotion(dto.getEmotionsMap().get("emotion").toString());
//        int result = diaryMapper.saveEmotion(dto);
//        if(result == 1){
//            System.out.println("감정 저장 완료");
//        }
//    }
}
