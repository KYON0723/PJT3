package com.ssafy.slr.MUSIC.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.slr.Content.domain.Recommend;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
//@Table()
public class Music {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "music_seq")
    private Long musicSeq;

    @Column(name = "music_name", nullable = false)
    private String musicName;

    @Column(name = "music_artist", nullable = false)
    private String musicArtist;

    @Column(name = "music_picture")
    private String musicPicture;

    @Column(name = "music_release")
    private String musicRelease;

    @Column(name = "music_likes", nullable = false)
    private int musicLikes;

    @Setter
    @Column(name = "music_lyrics", nullable = false)
    private String musicLyrics;

    @Column(name = "music_path", nullable = false)
    private String musicPath;

    @JsonManagedReference
    @OneToMany(mappedBy = "music", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "music", cascade = CascadeType.ALL, orphanRemoval = true)
    private  List<MusicLike> likes = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "music", cascade = CascadeType.ALL, orphanRemoval = true)
    private  List<PlaylistMusic> playlistMusics = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "music", cascade = CascadeType.ALL, orphanRemoval = true)
    private  List<Recommend> recommends = new ArrayList<>();

}
