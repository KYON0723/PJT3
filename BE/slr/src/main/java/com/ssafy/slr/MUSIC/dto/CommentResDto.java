package com.ssafy.slr.MUSIC.dto;

import com.ssafy.slr.MUSIC.domain.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
@Builder
@AllArgsConstructor
public class CommentResDto {

    private Long commentSeq;
    private String userNick;
    private String comment;
    private Date commentDate;

    public CommentResDto(Comment comment) {
        this.commentSeq = comment.getCommentSeq();
        this.userNick = comment.getUser().getUserNick();
        this.comment = comment.getComment();
        this.commentDate = comment.getCommentDate();
    }


}
