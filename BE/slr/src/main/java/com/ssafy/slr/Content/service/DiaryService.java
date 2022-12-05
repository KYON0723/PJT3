package com.ssafy.slr.Content.service;


import com.ssafy.slr.Content.domain.Cal;
import com.ssafy.slr.Content.domain.Diary;
import com.ssafy.slr.Content.domain.Recommend;
import com.ssafy.slr.Content.dto.CalDetailResDto;
import com.ssafy.slr.Content.dto.CalResDto;
import com.ssafy.slr.Content.repository.CalRepository;
import com.ssafy.slr.Content.repository.DiaryRepository;
import com.ssafy.slr.Content.repository.RecommendRepository;
import com.ssafy.slr.USER.domain.User;
import com.ssafy.slr.USER.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class DiaryService {
    private final CalRepository calRepository;
    private final UserRepository userRepository;
    private final DiaryRepository diaryRepository;
    private final RecommendRepository recommendRepository;

    @Transactional(rollbackFor = {Exception.class})
    public String findDiaryContentsByCalSeq(Long calSeq) {
        Cal calEntity = calRepository.findByCalSeq(calSeq);
        Diary diaryEntity = diaryRepository.findByCal(calEntity);
        return diaryEntity.getDiaryContent();
    }

    @Transactional(rollbackFor = {Exception.class})
    public String findDiaryWeatherByCalSeq(Long calSeq) {
        Cal calEntity = calRepository.findByCalSeq(calSeq);
        Diary diaryEntity = diaryRepository.findByCal(calEntity);
        return diaryEntity.getDiaryWeather();
    }

    @Transactional(rollbackFor = {Exception.class})
    public void diarySave(Long userSeq, String calYmd, String diaryContent, String diaryWeather, String calEmotion) throws Exception {
//    public void diarySave(Long userSeq, String calYmd, String diaryContent, String diaryWeather) throws Exception {
        // 1차적으로 캘린더 생성
        User user = userRepository.findByUserSeq(userSeq);
        Cal calSave = Cal.builder()
                .calYmd(calYmd)
                .user(user)
//                .calEmotion(calEmotion)
                .calEmotion(calEmotion)
                .recommends(new ArrayList<>())
                .diaries(new ArrayList<>())
                .build();
        log.info(calSave.getCalYmd());

        Cal resCal = calRepository.save(calSave);

        if (resCal == null) {
            log.info("캘린더 등록에 실패하였습니다.");
            throw new Exception("캘린더 등록 실패");
        }
        log.info("캘린더 등록에 성공하였습니다.");

        Diary diaryEntity = Diary.builder()
                .diaryContent(diaryContent)
                .diaryWeather(diaryWeather)
//                .diaryYmd(new Date())
                .user(user)
                .cal(calSave)
                .build();

        Diary resDiary = diaryRepository.save(diaryEntity);

        if (resDiary == null) {
            log.info("일기 등록에 실패하였습니다.");
            throw new Exception("일기 등록 실패");
        }
        log.info("일기 등록에 성공하였습니다.");
    }
}
