package com.ssafy.slr.MUSIC.dto;

import com.ssafy.slr.MUSIC.domain.Comment;
import com.ssafy.slr.MUSIC.domain.Music;
import com.ssafy.slr.USER.domain.User;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;

@Slf4j
@ToString
@AllArgsConstructor
@Getter
@Setter
@Data
public class CommentReqDto {

    private Long musicSeq;
    private String comment;

    public Comment toEntity(Music musicEntity, User usersEntity) {
        log.info(this.comment);
        return Comment.builder()
                .user(usersEntity)
                .music(musicEntity)
                .comment(this.comment)
                .commentDate(new Date())
                .build();
    }
}
