package com.ssafy.slr.Content.service;


import com.ssafy.slr.Content.domain.Cal;
import com.ssafy.slr.Content.domain.Recommend;
import com.ssafy.slr.Content.dto.RecMusicResDto;
import com.ssafy.slr.Content.dto.RecMusicSaveDto;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class RecommendService {
    private final CalRepository calRepository;
    private final RecommendRepository recommendRepository;
    private final MusicRepository musicRepository;
    private final UserRepository userRepository;

    @Transactional
    public String findMusicPictureByCalSeq(Long calSeq) throws Exception {
        log.info("1");
        Recommend recommendEntity = recommendRepository.findByCalSeqAndRecMain(calSeq, true);
        log.info("2");

        if (recommendEntity == null) {
            return "";
        }
            return recommendEntity.getMusic().getMusicPicture();
    }

    @Transactional
    public String findMusicNameByCalSeq(Long calSeq) throws Exception {
        log.info("1");
        Recommend recommendEntity = recommendRepository.findByCalSeqAndRecMain(calSeq, true);
        log.info("2");

        if (recommendEntity == null) {
            return "";
        }
        return recommendEntity.getMusic().getMusicName();
    }

    public List<RecMusicResDto> findMusicByCalSeq(Long calSeq) {
        log.info("11");
        Cal calEntity = calRepository.findByCalSeq(calSeq);
        log.info("22");
        List<Recommend> recList = recommendRepository.findAllByCal(calEntity);
        log.info("222");
        List<Music> musicList = new ArrayList<Music>();
        for (int i = 0; i < recList.size(); i++) {
            musicList.add(i, recList.get(i).getMusic());
            log.info(String.valueOf(recList.get(i)));
        }
        log.info("33");
        return musicList.stream().map(RecMusicResDto::new).collect(Collectors.toList());

    }

    public void recMusicListSave(List<Long> recommendList, Long calSeq) {
        log.info("recMusicListSave 1111");

        Cal calEntity = calRepository.findByCalSeq(calSeq);
        log.info(calEntity.getCalYmd());
        for (int i = 0; i < recommendList.size(); i++){
            log.info("for i = " + i);
            Boolean b = false;
//            기본적으로 첫 음악이 메인 음악 설정정
           if (i == 0) {
                b = true;
            }
            log.info("test111");
            System.out.println(recommendList.get(i));
            log.info(String.valueOf(recommendList.get(i)));
            Music musicEntity = musicRepository.findByMusicSeq(Long.valueOf(String.valueOf(recommendList.get(i))));
            System.out.println(musicEntity.getMusicName());
            Recommend recommendEntity = Recommend.builder()
                    .cal(calEntity)
                    .music(musicEntity)
                    .recMain(b)
                    .build();
            log.info("test222");
           recommendRepository.save(recommendEntity);
        }
        log.info("recMusicListSave 2222");
    }
}
