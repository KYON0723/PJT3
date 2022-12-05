package com.ssafy.slr.MUSIC.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.slr.USER.domain.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
//@Table()
public class Playlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "play_seq")
    private Long playSeq;

    @Column(name = "play_name", nullable = false)
    private String playName;

    @Column(name = "play_priority", nullable = false)
    private int playPriority;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @JsonManagedReference
    @OneToMany(mappedBy = "play", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlaylistMusic> playlistMusics = new ArrayList<>();


    public void updatePlaylist (String playName, int playPriority){
        this.playName = playName;
        this.playPriority = playPriority;
    }
}
