package com.ssafy.slr.MUSIC.service;

import com.ssafy.slr.MUSIC.dto.RecMusicsReqDto;
import com.ssafy.slr.MUSIC.dto.RecMusicsResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.SQLException;

@Slf4j
@Service
@RequiredArgsConstructor
public class MusicRecService {

    private final FastApiRecMusics fastApiRecMusics;

    public RecMusicsResDto getRecMusicSeqs(RecMusicsReqDto recMusicsReqDto) throws IOException, SQLException {

//        Map<Boolean, Object> result = new HashMap<>();
//        Map<String, Object> resultBody = new HashMap<>();


        //통신 부분 스레드로 실행
        RecMusicsResDto recMusicsResDto = fastApiRecMusics.fastApiRecList(recMusicsReqDto);

//        resultBody.put("status", "SUCCESS");
//        result.put(true, resultBody);
        return recMusicsResDto;

    }
}
