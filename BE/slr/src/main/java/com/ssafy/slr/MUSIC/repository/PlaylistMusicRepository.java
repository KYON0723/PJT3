package com.ssafy.slr.MUSIC.repository;

import com.ssafy.slr.MUSIC.domain.Music;
import com.ssafy.slr.MUSIC.domain.Playlist;
import com.ssafy.slr.MUSIC.domain.PlaylistMusic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlaylistMusicRepository extends JpaRepository<PlaylistMusic, Long> {
    Optional<PlaylistMusic> findByPlay_PlaySeqAndMusic_MusicSeq(Long playId, Long musicId);
    List<PlaylistMusic> findAllByPlay_PlaySeq(Long playSeq);

    List<PlaylistMusic> findAllByPlay(Playlist playlist);
}
