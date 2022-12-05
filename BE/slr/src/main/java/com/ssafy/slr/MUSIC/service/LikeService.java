package com.ssafy.slr.MUSIC.service;

import com.ssafy.slr.MUSIC.domain.Music;
import com.ssafy.slr.MUSIC.domain.MusicLike;
import com.ssafy.slr.MUSIC.repository.LikeRepository;
import com.ssafy.slr.MUSIC.repository.MusicRepository;
import com.ssafy.slr.USER.domain.User;
import com.ssafy.slr.USER.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;
    private final UserRepository userRepository;
    private final MusicRepository musicRepository;

    public boolean findByMusicSeqAndUserSeq(Long musicSeq, Long userSeq) {
        Music music = musicRepository.findByMusicSeq(musicSeq);
        User user = userRepository.findByUserSeq(userSeq);
        log.info(music.getMusicSeq() + " 노래의 " + user.getUserSeq() + " 유저 좋아요 여부 확인");
        MusicLike musicLike = likeRepository.findByUserAndMusic(user, music);
        if (musicLike == null){
            return false;
        } else {
            return true;
        }
    }

}

