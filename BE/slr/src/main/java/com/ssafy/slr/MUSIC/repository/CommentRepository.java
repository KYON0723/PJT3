package com.ssafy.slr.MUSIC.repository;

import com.ssafy.slr.MUSIC.domain.Comment;
import com.ssafy.slr.MUSIC.domain.Music;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByMusic(Music music);

    Music findMusicByCommentSeq(Long commentSeq);

    Comment findByCommentSeq(Long commentSeq);
}
