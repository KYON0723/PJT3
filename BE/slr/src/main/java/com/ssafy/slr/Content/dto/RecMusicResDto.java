package com.ssafy.slr.Content.dto;

import com.ssafy.slr.MUSIC.domain.Music;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class RecMusicResDto {

    private Long musicSeq;
    private String musicName;
    private String musicArtist;
    private String musicRelease;
    private int musicLikes;
    private String musicLyrics;
    private String musicPicture;
    private String musicPath;



    public RecMusicResDto (Music music){
        this.musicSeq = music.getMusicSeq();
        this.musicName = music.getMusicName();
        this.musicArtist = music.getMusicArtist();
        this.musicPicture = music.getMusicPicture() + ".jpg";
        this.musicRelease = music.getMusicRelease();
        this.musicLikes = music.getMusicLikes();
        this.musicLyrics = music.getMusicLyrics() + ".lrc";
        this.musicPath = music.getMusicPath() + ".mp3";
    }

}
