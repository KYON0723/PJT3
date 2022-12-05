package com.ssafy.slr.MUSIC.controller;


import com.ssafy.slr.MUSIC.domain.Playlist;
import com.ssafy.slr.MUSIC.domain.PlaylistMusic;
import com.ssafy.slr.MUSIC.dto.PlaylistMusicResDto;
import com.ssafy.slr.MUSIC.dto.PlaylistNewDto;
import com.ssafy.slr.MUSIC.dto.PlaylistResDto;
import com.ssafy.slr.MUSIC.repository.PlaylistRepository;
import com.ssafy.slr.MUSIC.service.PlaylistService;
import com.ssafy.slr.global.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/playlists")
@RequiredArgsConstructor
public class PlaylistController {

    private final PlaylistService playlistService;
    private final JwtProvider jwtProvider;

    @GetMapping("")
    public ResponseEntity<List<PlaylistNewDto>> getPlaylist(HttpServletRequest request){
        try {
            String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[1];
            log.info("#accessToken# : " + accessToken);
            request.setAttribute("userSeq", jwtProvider.getUserSeqFromAccessToken(accessToken));
            Integer temp = Integer.parseInt(String.valueOf(request.getAttribute("userSeq")));
            Long userSeq = Long.parseLong(String.valueOf(temp));
            log.info(String.valueOf(userSeq));

            return  ResponseEntity.ok(playlistService.getPlaylist(userSeq));
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.valueOf(500));
        }
    }

    @PostMapping("")
    public ResponseEntity<?> createPlaylist(HttpServletRequest request, @RequestParam("playName") String playName) {
        try {
            String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[1];
            log.info("#accessToken# : " + accessToken);
            request.setAttribute("userSeq", jwtProvider.getUserSeqFromAccessToken(accessToken));
            Integer temp = Integer.parseInt(String.valueOf(request.getAttribute("userSeq")));
            Long userSeq = Long.parseLong(String.valueOf(temp));
            log.info(String.valueOf(userSeq));

            playlistService.createPlaylist(userSeq, playName);
            log.info("playlist create");
            return new ResponseEntity<>(true, HttpStatus.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.valueOf(500));
        }
    }
    @Transactional
    @PutMapping("")
    public ResponseEntity<?> updatePlaylist(@RequestBody List<Map<String, Object>> playlists) {
        ResponseEntity<?> result;
        try {
            for(int i=0; i<playlists.size(); i++){
                PlaylistResDto playlistResDto = new PlaylistResDto();
                playlistResDto.setUserSeq(Long.parseLong(String.valueOf(playlists.get(i).get("userSeq"))));
                playlistResDto.setPlaySeq(Long.parseLong(String.valueOf(playlists.get(i).get("playSeq"))));
                playlistResDto.setPlayName(playlists.get(i).get("playName").toString());
                playlistResDto.setPlayPriority((Integer) playlists.get(i).get("playPriority"));

                System.out.println("for");
                playlistService.updatePlaylist(playlistResDto);
            }

            log.info("playlist update");
            result = new ResponseEntity<>(true, HttpStatus.valueOf(200));
        } catch (Exception e) {
            result = new ResponseEntity<>(false, HttpStatus.valueOf(500));
        }
        return result;
    }

    @Transactional
    @DeleteMapping("")
    public Map<String, Object> deletePlaylist(@RequestParam("playSeq") Long playSeq) {
        Map<String, Object> response = new HashMap<>();
        if(playlistService.deletePlaylist(playSeq) > 0){
            response.put("result", "SUCCESS");
        }else {
            response.put("result", "FAIL");
            response.put("reason", "일치하는 플레이리스트가 없습니다.");
        }
        return response;
    }

    @GetMapping("/{playSeq}")
    public ResponseEntity<List<PlaylistMusicResDto>> getPlaylistmusic(@PathVariable("playSeq") Long playSeq){
        try {
            return ResponseEntity.ok(playlistService.getPlaylistmusic(playSeq));
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.valueOf(500));
        }
    }

    @Transactional
    @PostMapping("/musics/{playSeq}")
    public ResponseEntity<?> addMusics(@PathVariable("playSeq") Long playSeq, @RequestBody List<Map<String, Object>> musiclist) {
        try {
            playlistService.addMusics(playSeq, musiclist);
            return new ResponseEntity<>(true, HttpStatus.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.valueOf(500));
        }
    }
//    @Transactional
//    @DeleteMapping("/musics")
//    public Map<String, Object> deletePlaylistMusic(@RequestParam("playSeq") Long playSeq, @RequestParam("musicSeq") Long musicSeq) {
//        Map<String, Object> response = new HashMap<>();
//        if(playlistService.deletePlaylistMusic(playSeq, musicSeq) > 0){
//            response.put("result", "SUCCESS");
//        }else {
//            response.put("result", "FAIL");
//            response.put("reason", "플레이리스트에 일치하는 노래가 없습니다.");
//        }
//        return response;
//    }
//
//    @Transactional
//    @PutMapping("/musics")
//    public ResponseEntity<?> updatePlaylistMusic(@RequestBody List<Map<String, Object>> musiclists) {
//        ResponseEntity<?> result;
//        try {
//            playlistService.updatePlaylistMusic(musiclists);
//
//            log.info("playlist music update");
//            result = new ResponseEntity<>(true, HttpStatus.valueOf(200));
//        } catch (Exception e) {
//            result = new ResponseEntity<>(false, HttpStatus.valueOf(500));
//        }
//        return result;
//    }
}
