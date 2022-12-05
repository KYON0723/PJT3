package com.ssafy.slr.MUSIC.repository;

import com.ssafy.slr.MUSIC.domain.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    List<Playlist> findAllByUser_UserSeq(Long userSeq);

    Optional<Playlist> findByPlaySeq(Long playSeq);

}
