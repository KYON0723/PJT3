package com.ssafy.slr.Content.controller;

import com.ssafy.slr.Content.dto.*;
import com.ssafy.slr.Content.service.*;
import com.ssafy.slr.MUSIC.service.PlaylistService;
import com.ssafy.slr.global.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/diaries")
@RequiredArgsConstructor
public class DiaryController {

    private final DiaryService diaryService;
    private final QuestionService questionService;
    private final EmotionService emotionService;
    private final PlaylistService playlistService;
    private final CalService calService;
    private final RecommendService recommendService;
    private final JwtProvider jwtProvider;

    @GetMapping("/pre-voice")
    public ResponseEntity<?> getPreVoice() throws Exception {
        String preVoice = questionService.findPreVoice();
        return new ResponseEntity<>(preVoice, HttpStatus.valueOf(200));
    }

    @GetMapping("/questions")
    public ResponseEntity<?> getQuestionList() throws Exception {
        List<QuestionResDto> questionEntity = questionService.findQuestionList();
        return new ResponseEntity<>(questionEntity, HttpStatus.valueOf(200));
    }

    @PostMapping
//    public ResponseEntity<?> diarySave(HttpServletRequest request, @RequestParam("calYmd") String calYmd, @RequestParam("diaryContent") String diaryContent, @RequestParam() String diaryWeather) throws Exception {
    public ResponseEntity<?> diarySave(HttpServletRequest request, @RequestBody DiarySaveReqDto diarySaveReqDto) throws Exception {
        try {
            String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[1];
            log.info("#accessToken# : " + accessToken);
            request.setAttribute("userSeq", jwtProvider.getUserSeqFromAccessToken(accessToken));
            Integer temp = Integer.parseInt(String.valueOf(request.getAttribute("userSeq")));
            Long userSeq = Long.parseLong(String.valueOf(temp));
            log.info(String.valueOf(userSeq));

//            fastAPI 연동
            EmotionReqDto emotionReqDto = new EmotionReqDto();
            List<Long> musicsInPlayList = playlistService.getMusicsInPlayList(userSeq);
//            emotionReqDto.setDiaryContent(diarySaveReqDto.getDiaryContentLong());
            emotionReqDto.setDiaryContent(diarySaveReqDto.getDiaryContent());
            emotionReqDto.setPlayListMusicsList(musicsInPlayList);
            log.info(emotionReqDto.getDiaryContent());
            log.info(String.valueOf(emotionReqDto.getPlayListMusicsList().size()));
            EmotionResDto emotionResDto = emotionService.getEmotion(emotionReqDto);

//            log.info(diarySaveReqDto.getDiaryContentShort() + " " + diarySaveReqDto.getDiaryContentLong() + " " + diarySaveReqDto.getDiaryWeather());
            diaryService.diarySave(userSeq, diarySaveReqDto.getCalYmd(), diarySaveReqDto.getDiaryContent(), diarySaveReqDto.getDiaryWeather(), emotionResDto.getEmotion());
//            diaryService.diarySave(userSeq, diarySaveReqDto, emotionResDto.getEmotion());
            log.info("일기 저장");
            System.out.println(emotionResDto.getRecommendList());

            CalDetailResDto calDetail = calService.findByUserAndCalYmd(userSeq, diarySaveReqDto.getCalYmd());
            recommendService.recMusicListSave(emotionResDto.getRecommendList(), calDetail.getCalSeq());
            calDetail.setMusicPicture(recommendService.findMusicPictureByCalSeq(calDetail.getCalSeq()) + ".jpg");
            calDetail.setMusicName(recommendService.findMusicNameByCalSeq(calDetail.getCalSeq()));
            calDetail.setRecommendList(recommendService.findMusicByCalSeq(calDetail.getCalSeq()));
//            calDetail.setDiaryContentShort(diaryService.findDiaryContentShortByCalSeq(calDetail.getCalSeq()));
//            calDetail.setDiaryContentLong(diaryService.findDiaryContentLongByCalSeq(calDetail.getCalSeq()));
            calDetail.setDiaryContents(diaryService.findDiaryContentsByCalSeq(calDetail.getCalSeq()));
            calDetail.setDiaryWeather(diaryService.findDiaryWeatherByCalSeq(calDetail.getCalSeq()));
            return new ResponseEntity<>(calDetail, HttpStatus.valueOf(201));
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.valueOf(500));
        }
    }
}
