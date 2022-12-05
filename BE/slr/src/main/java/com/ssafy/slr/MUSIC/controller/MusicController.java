package com.ssafy.slr.MUSIC.controller;

import com.ssafy.slr.MUSIC.dto.MusicResDto;
import com.ssafy.slr.MUSIC.dto.RecMusicsReqDto;
import com.ssafy.slr.MUSIC.dto.RecMusicsResDto;
import com.ssafy.slr.MUSIC.service.*;
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
@RequestMapping("/musics")
@RequiredArgsConstructor
public class MusicController {

    private final MusicService musicService;
    private final CommentService commentService;
    private final LikeService likeService;
    private final PlaylistService playlistService;
    private final MusicRecService musicRecService;
    private final JwtProvider jwtProvider;

    @GetMapping("")
    public ResponseEntity<?> getMusic(HttpServletRequest request, @RequestParam("musicSeq") Long musicSeq){
        try {
            String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[1];
            log.info("#accessToken# : " + accessToken);
            request.setAttribute("userSeq", jwtProvider.getUserSeqFromAccessToken(accessToken));
            Integer temp = Integer.parseInt(String.valueOf(request.getAttribute("userSeq")));
            Long userSeq = Long.parseLong(String.valueOf(temp));
            log.info(String.valueOf(userSeq));

            // fastAPI 연동
            RecMusicsReqDto recMusicsReqDto = new RecMusicsReqDto();
            List<Long> musicsInPlayList = playlistService.getMusicsInPlayList(userSeq);
            recMusicsReqDto.setMusicSeq(musicSeq);
            recMusicsReqDto.setPlayListMusicsList(musicsInPlayList);
            RecMusicsResDto recMusicsResDto = musicRecService.getRecMusicSeqs(recMusicsReqDto);

            MusicResDto music = musicService.findByMusicSeq(musicSeq);
            music.setRecMusicList(musicService.getRecMusicList(recMusicsResDto.getRecMusicSeqList()));
            if (userSeq == 0) {
                music.setUserMusicLike(false);
            } else {
                music.setUserMusicLike(likeService.findByMusicSeqAndUserSeq(music.getMusicSeq(), userSeq));
            }
            music.setCommentList(commentService.findAllByMusicSeq(music.getMusicSeq()));
            return new ResponseEntity<>(music, HttpStatus.valueOf(200));
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.valueOf(500));
        }
    }

    @PostMapping("/likes")
    public ResponseEntity<?> postMusicLike(HttpServletRequest request, @RequestParam("musicSeq") Long musicSeq) {
        try {
            String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[1];
            log.info("#accessToken# : " + accessToken);
            request.setAttribute("userSeq", jwtProvider.getUserSeqFromAccessToken(accessToken));
            Integer temp = Integer.parseInt(String.valueOf(request.getAttribute("userSeq")));
            Long userSeq = Long.parseLong(String.valueOf(temp));
            log.info(String.valueOf(userSeq));

            musicService.likeMusic(musicSeq, userSeq);
            log.info("좋아요 Controller");
            return new ResponseEntity<>(true, HttpStatus.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.valueOf(500));
        }
    }



}
