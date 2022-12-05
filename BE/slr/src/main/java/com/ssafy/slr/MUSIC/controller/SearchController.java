package com.ssafy.slr.MUSIC.controller;

import com.ssafy.slr.MUSIC.domain.Music;
import com.ssafy.slr.MUSIC.dto.MusicResDto;
import com.ssafy.slr.MUSIC.service.MusicService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {

    private final MusicService musicService;

    @GetMapping("")
    public ResponseEntity<List<MusicResDto>> getTopMusic(){
        return ResponseEntity.ok(musicService.getTopMusic());
    }

    @GetMapping("/{keyword}")
    public ResponseEntity<List<MusicResDto>> getAllMusic(@RequestParam("type") String type, @PathVariable("keyword") String keyword){
        System.out.println(keyword);
            return ResponseEntity.ok(musicService.getSearchMusic(type, keyword));
    }



}
