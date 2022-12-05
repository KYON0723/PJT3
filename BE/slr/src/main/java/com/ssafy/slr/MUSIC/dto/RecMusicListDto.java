package com.ssafy.slr.MUSIC.dto;

import com.ssafy.slr.MUSIC.domain.Music;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
public class RecMusicListDto {

    private Long musicSeq;
    private String musicName;
    private String musicArtist;
    private String musicPicture;

    public RecMusicListDto (Music music){
        this.musicSeq = music.getMusicSeq();
        this.musicName = music.getMusicName();
        this.musicArtist = music.getMusicArtist();
        this.musicPicture = music.getMusicPicture() + ".jpg";
    }

}
