package com.ssafy.slr.MUSIC.repository;

import com.ssafy.slr.MUSIC.domain.Music;
import com.ssafy.slr.MUSIC.domain.MusicLike;
import com.ssafy.slr.USER.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface LikeRepository extends JpaRepository<MusicLike, Long> {

    MusicLike findByUserAndMusic(User user, Music music);

//    MusicLike findByMusicAndUser(Music music, User user);
}
