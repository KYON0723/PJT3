package com.ssafy.slr.MUSIC.service;

import com.ssafy.slr.MUSIC.domain.Comment;
import com.ssafy.slr.MUSIC.domain.Music;
import com.ssafy.slr.MUSIC.dto.CommentResDto;
import com.ssafy.slr.MUSIC.repository.CommentRepository;
import com.ssafy.slr.MUSIC.repository.MusicRepository;
import com.ssafy.slr.USER.domain.User;
import com.ssafy.slr.USER.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentService {

    private final MusicRepository musicRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;


    public List<CommentResDto> findAllByMusicSeq(Long musicSeq) {
        Music music = musicRepository.findById(musicSeq).orElseThrow(() -> new IllegalArgumentException("해당 음악이 없습니다."));
        List<Comment> commentList = commentRepository.findAllByMusic(music);
        log.info(music.getMusicName() + " 노래의 댓글을 조회");
        return commentList.stream().map(CommentResDto::new).collect(Collectors.toList());
    }

    public void commentSave(Long musicSeq, Long userSeq, String comment) throws Exception {
        Music music = musicRepository.findByMusicSeq(musicSeq);
        log.info(music.getMusicName());
        User user = userRepository.findByUserSeq(userSeq);
        log.info(user.getUserNick());
        Comment commentEntity = Comment.builder()
                .comment(comment)
                .commentDate(new Date())
                .user(user)
                .music(music)
                .build();
        log.info("test");
        Comment resComment = commentRepository.save(commentEntity);
        log.info("testSave");
        if (resComment == null) {
            log.info("댓글 등록에 실패하였습니다.");
            throw new Exception("댓글 등록 실패");
        }
        log.info("댓글 등록에 성공하였습니다.");
    }

    public void commentDelete(Long commentSeq, Long userSeq) throws Exception {
        Comment commentEntity = commentRepository.findById(commentSeq).orElseThrow(() -> new RuntimeException("해당 댓글 없습니다."));
        User userEntity = userRepository.findById(userSeq).orElseThrow(() -> new RuntimeException("해당 유저가 없습니다."));
        if(userEntity.getUserSeq().equals(commentEntity.getUser().getUserSeq())){
            commentRepository.delete(commentEntity);
        }else{
            new RuntimeException("실패");
            throw new Exception("댓글 작성자가 아닙니다.");
        }
    }


    public void commentUpdate(Long commentSeq, Long userSeq, String comment) throws Exception {
        log.info("service1");
        User userEntity = userRepository.findByUserSeq(userSeq);
        log.info(userEntity.getUserNick());
        Comment commentEntity = commentRepository.findByCommentSeq(commentSeq);
        log.info(commentEntity.getComment());

        if (userEntity.getUserSeq().equals(commentEntity.getUser().getUserSeq())) {
            Comment res = Comment.builder()
                    .commentSeq(commentSeq)
                    .comment(comment)
                    .commentDate(new Date())
                    .music(commentEntity.getMusic())
                    .user(userEntity)
                    .build();
            commentRepository.save(res);
            log.info("댓글 수정하였습니다.");
        } else {
            log.info("댓글 작성 유저가 아닙니다.");
            throw new Exception("댓글 수정 실패");
    }
    }
}

