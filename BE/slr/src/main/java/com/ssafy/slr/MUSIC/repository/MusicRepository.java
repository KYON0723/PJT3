package com.ssafy.slr.MUSIC.repository;


import com.ssafy.slr.MUSIC.domain.Music;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MusicRepository extends JpaRepository<Music, Long> {

    Music findByMusicSeq(Long musicSeq);

    List<Music> findByMusicNameContaining(String musicName );
    List<Music> findByMusicArtistContaining(String musicArtist );

    List<Music> findTop20ByOrderByMusicReleaseDesc();
}
