package com.ssafy.slr.MUSIC.controller;

import com.ssafy.slr.MUSIC.dto.CommentReqDto;
import com.ssafy.slr.MUSIC.service.CommentService;
import com.ssafy.slr.global.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/musics/comments")
public class CommentController {

    private final CommentService commentService;
    private final JwtProvider jwtProvider;

    @PostMapping
//    public ResponseEntity<?> commentSave(HttpServletRequest request, @RequestParam("musicSeq") Long musicSeq, @RequestParam("comment") String comment) throws Exception {
    public ResponseEntity<?> commentSave(HttpServletRequest request, @RequestBody CommentReqDto commentReqDto) throws Exception {
        try {
            String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[1];
            log.info("#accessToken# : " + accessToken);
            request.setAttribute("userSeq", jwtProvider.getUserSeqFromAccessToken(accessToken));
            Integer temp = Integer.parseInt(String.valueOf(request.getAttribute("userSeq")));
            Long userSeq = Long.parseLong(String.valueOf(temp));
            log.info(String.valueOf(userSeq));

            log.info(commentReqDto.getComment());
            commentService.commentSave(commentReqDto.getMusicSeq(), userSeq, commentReqDto.getComment());
            return new ResponseEntity<>(true, HttpStatus.valueOf(201));
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.valueOf(500));
        }
    }

    @DeleteMapping
    public ResponseEntity<?> commentDelete(HttpServletRequest request, @RequestParam Long commentSeq) {
        try {
            String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[1];
            log.info("#accessToken# : " + accessToken);
            request.setAttribute("userSeq", jwtProvider.getUserSeqFromAccessToken(accessToken));
            Integer temp = Integer.parseInt(String.valueOf(request.getAttribute("userSeq")));
            Long userSeq = Long.parseLong(String.valueOf(temp));
            log.info(String.valueOf(userSeq));

            commentService.commentDelete(commentSeq, userSeq);
            return new ResponseEntity<>(true, HttpStatus.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.valueOf(400));
        }
    }

    @PutMapping
    public ResponseEntity<?> commentUpdate(HttpServletRequest request, @RequestParam Long commentSeq, @RequestParam String comment) {
        try {
            String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).split(" ")[1];
            log.info("#accessToken# : " + accessToken);
            request.setAttribute("userSeq", jwtProvider.getUserSeqFromAccessToken(accessToken));
            Integer temp = Integer.parseInt(String.valueOf(request.getAttribute("userSeq")));
            Long userSeq = Long.parseLong(String.valueOf(temp));
            log.info(String.valueOf(userSeq));

            log.info(comment);
            commentService.commentUpdate(commentSeq, userSeq, comment);
            return new ResponseEntity<>(true, HttpStatus.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.valueOf(500));
        }
    }


}
