package com.ssafy.slr.MUSIC.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ssafy.slr.USER.domain.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Setter
//@Table()
public class PlaylistMusic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "play_music_seq", nullable = false)
    private Long playMusicSeq;

    @Column(name = "play_music_order", nullable = false)
    private int playMusicOrder;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "play_seq")
    private Playlist play;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "music_seq")
    private Music music;

    public void updateMusiclist (int playMusicOrder){
        this.playMusicOrder = playMusicOrder;
    }
}
