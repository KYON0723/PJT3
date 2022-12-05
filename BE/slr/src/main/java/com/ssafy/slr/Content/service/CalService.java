package com.ssafy.slr.Content.service;


import com.ssafy.slr.Content.domain.Cal;
import com.ssafy.slr.Content.domain.Recommend;
import com.ssafy.slr.Content.dto.CalDetailResDto;
import com.ssafy.slr.Content.dto.CalResDto;
import com.ssafy.slr.Content.repository.CalRepository;
import com.ssafy.slr.Content.repository.RecommendRepository;
import com.ssafy.slr.MUSIC.domain.Music;
import com.ssafy.slr.MUSIC.repository.MusicRepository;
import com.ssafy.slr.USER.domain.User;
import com.ssafy.slr.USER.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CalService {
    private final CalRepository calRepository;
    private final UserRepository userRepository;
//    private final RecommendRepository recommendRepository;
//    private final MusicRepository musicRepository;

    @Transactional(rollbackFor = {Exception.class})
    public List<CalResDto> findAllByUserAndCalYmd(Long userSeq, String calYmd) {
//        log.info("userSeq를 통해 user 구하기");
        Optional<User> user = userRepository.findById(userSeq);
//        log.info("calYmd를 통해 calYm 구하기");
        String calYm = calYmd.substring(0, 7);

        List<CalResDto> cals = calRepository.findAllByUserAndCalYmdStartsWith(user, calYm);
//        log.info("캘린더 월별 전체 조회");
        return cals;
    }

    @Transactional(rollbackFor = {Exception.class})
    public CalDetailResDto findByUserAndCalYmd(Long userSeq, String calYmd) {
        log.info("1");
        User user = userRepository.findByUserSeq(userSeq);
        log.info("2");
        CalDetailResDto cal = calRepository.findByUserAndCalYmd(user, calYmd);
        log.info("cal.getCalYmd()");
        return cal;
    }
}
