package com.ssafy.slr.Content.controller;

import com.ssafy.slr.Content.domain.Recommend;
import com.ssafy.slr.Content.dto.CalDetailResDto;
import com.ssafy.slr.Content.dto.CalResDto;
import com.ssafy.slr.Content.service.CalService;
import com.ssafy.slr.Content.service.DiaryService;
import com.ssafy.slr.Content.service.RecommendService;
import com.ssafy.slr.global.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jmx.export.annotation.ManagedOperation;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/calendars")
@RequiredArgsConstructor
public class CalController {
    private final CalService calService;
    private final RecommendService recommendService;
    private final DiaryService diaryService;
    private final JwtProvider jwtProvider;

    @GetMapping
//    public ResponseEntity<?> getCalendars(@RequestParam("userSeq") Long userSeq, @RequestParam("calYmd")String calYmd) throws Exception {
    public ResponseEntity<?> getCalendars(HttpServletRequest request, @RequestParam("calYmd")String calYmd) throws Exception {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[1];
        log.info("#accessToken# : " + accessToken);
        request.setAttribute("userSeq", jwtProvider.getUserSeqFromAccessToken(accessToken));
        Integer temp = Integer.parseInt(String.valueOf(request.getAttribute("userSeq")));
        Long userSeq = Long.parseLong(String.valueOf(temp));
        log.info(String.valueOf(userSeq));
        List<CalResDto> cals = calService.findAllByUserAndCalYmd(userSeq, calYmd);
        for (int i = 0; i < cals.size(); i++ ) {
            log.info(String.valueOf(i));
            cals.get(i).setMusicPicture(recommendService.findMusicPictureByCalSeq(cals.get(i).getCalSeq()) + ".jpg");
            cals.get(i).setMusicName(recommendService.findMusicNameByCalSeq(cals.get(i).getCalSeq()));
        }
        return new ResponseEntity<>(cals, HttpStatus.valueOf(200));
    }

    @GetMapping("/details")
    public ResponseEntity<?> getCalendardetail(HttpServletRequest request, @RequestParam("calYmd")String calYmd) throws Exception {

        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[1];
        log.info("#accessToken# : " + accessToken);
        request.setAttribute("userSeq", jwtProvider.getUserSeqFromAccessToken(accessToken));
        Integer temp = Integer.parseInt(String.valueOf(request.getAttribute("userSeq")));
        Long userSeq = Long.parseLong(String.valueOf(temp));
        log.info(String.valueOf(userSeq));

        CalDetailResDto calDetail = calService.findByUserAndCalYmd(userSeq, calYmd);
        calDetail.setMusicPicture(recommendService.findMusicPictureByCalSeq(calDetail.getCalSeq()) + ".jpg");
        calDetail.setMusicName(recommendService.findMusicNameByCalSeq(calDetail.getCalSeq()));
        calDetail.setRecommendList(recommendService.findMusicByCalSeq(calDetail.getCalSeq()));
        calDetail.setDiaryContents(diaryService.findDiaryContentsByCalSeq(calDetail.getCalSeq()));
        calDetail.setDiaryWeather(diaryService.findDiaryWeatherByCalSeq(calDetail.getCalSeq()));
        return new ResponseEntity<>(calDetail, HttpStatus.valueOf(200));
    }
}
