package com.ssafy.slr.MUSIC.service;

import com.ssafy.slr.MUSIC.domain.Music;
import com.ssafy.slr.MUSIC.domain.MusicLike;
import com.ssafy.slr.MUSIC.dto.MusicResDto;
import com.ssafy.slr.MUSIC.dto.RecMusicListDto;
import com.ssafy.slr.MUSIC.repository.LikeRepository;
import com.ssafy.slr.MUSIC.repository.MusicRepository;
import com.ssafy.slr.USER.domain.User;
import com.ssafy.slr.USER.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MusicService {

    private final MusicRepository musicRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;


    public MusicResDto findByMusicSeq(Long musicSeq){
        Music music = musicRepository.findByMusicSeq(musicSeq);
        log.info(music.getMusicName() + " 노래를 조회");

        return new MusicResDto(music);
    }


    public void likeMusic(Long musicSeq, Long userSeq) throws Exception {
        Music music = musicRepository.findByMusicSeq(musicSeq);
        log.info(music.getMusicName() + " 노래를 조회");
        User user = userRepository.findByUserSeq(userSeq);
        log.info(user.getUserSeq() + " 유저를 조회");
        MusicLike like = likeRepository.findByUserAndMusic(user, music);
        log.info("like");
        Music musicEntity = null;
        // 해당 유저가 좋아요를 한 리뷰라면 OFF
        if (like != null) {
            likeRepository.delete(like);

            // 좋아요 감소
            musicEntity = musicRepository.save(Music.builder()
                            .musicSeq(music.getMusicSeq())
                            .musicName(music.getMusicName())
                            .musicArtist(music.getMusicArtist())
                            .musicPicture(music.getMusicPicture().replace(".jpg", ""))
                            .musicRelease(music.getMusicRelease())
                            .musicLikes(music.getMusicLikes() - 1)
                            .musicLyrics(music.getMusicLyrics().replace(".lrc", ""))
                            .musicPath(music.getMusicPath().replace(".mp3", ""))
                            .likes(music.getLikes())
                            .comments(music.getComments())
                            .playlistMusics(music.getPlaylistMusics())
                            .recommends(music.getRecommends())
                            .build());
            log.info(musicEntity.getMusicSeq() + "번 음악 좋아요 취소");
        }

        // 해당 유저가 좋아요 안한 상태라면 ON
        else {
            like = MusicLike.builder()
                    .user(user)
                    .music(music)
                    .build();

            likeRepository.save(like);

            // 좋아요 증가
            musicEntity = musicRepository.save(music.builder()
                    .musicSeq(music.getMusicSeq())
                    .musicName(music.getMusicName())
//                    .musicGenre(music.getMusicGenre())
                    .musicArtist(music.getMusicArtist())
                    .musicPicture(music.getMusicPicture().replace(".jpg", ""))
                    .musicRelease(music.getMusicRelease())
                    .musicLikes(music.getMusicLikes() + 1)
                    .musicLyrics(music.getMusicLyrics().replace(".lrc", ""))
                    .musicPath(music.getMusicPath().replace(".mp3", ""))
                    .likes(music.getLikes())
                    .comments(music.getComments())
                    .playlistMusics(music.getPlaylistMusics())
                    .recommends(music.getRecommends())
                    .build());
            log.info(musicEntity.getMusicSeq() + "번 음악 좋아요");
        }

        // 게시글 좋아요 수 반영 실패
        if (musicEntity == null) {
            log.info("게시글 좋아요 수 반영 실패");
            throw new Exception("게시글 좋아요 수 반영 실패");
        }
    }

    public List<MusicResDto> getSearchMusic(String type, String keyword){

        List<Music> musicList = null;
        if(type.equals("title")){
            musicList = musicRepository.findByMusicNameContaining(keyword);

        }else if(type.equals("artist")) {
            musicList = musicRepository.findByMusicArtistContaining(keyword);

        }
        return MusicResDto.ofList(musicList);
    }

    public List<MusicResDto> getTopMusic(){

        List<Music> musicList = musicRepository.findTop20ByOrderByMusicReleaseDesc();


        return MusicResDto.ofList(musicList);
    }

    public List<RecMusicListDto> getRecMusicList(List<Long> recMusicSeqList) {
        log.info("getRecMusicList 1");
        List<RecMusicListDto> result = new ArrayList<>();
        log.info("getRecMusicList 1-1");
        for (int i = 0; i < recMusicSeqList.size(); i++) {
            Music musicEntity = musicRepository.findByMusicSeq(Long.valueOf(String.valueOf(recMusicSeqList.get(i))));
            RecMusicListDto recMusicListDto = new RecMusicListDto(musicEntity);
            log.info("getRecMusicList 1-2");
            result.add(i, recMusicListDto);
            log.info("getRecMusicList 1-3");
        }
        log.info("getRecMusicList 2");
        return result;
    }
}
