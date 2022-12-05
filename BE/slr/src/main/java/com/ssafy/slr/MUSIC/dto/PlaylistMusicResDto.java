package com.ssafy.slr.MUSIC.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ssafy.slr.MUSIC.domain.Playlist;
import com.ssafy.slr.MUSIC.domain.PlaylistMusic;

import com.ssafy.slr.USER.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class PlaylistMusicResDto {

    private Long playMusicSeq;
    private Long playSeq;
    private Long musicSeq;

    private String musicName;
    private String musicArtist;
    private String musicRelease;
    private int musicLikes;
    private int playMusicOrder;

    public static PlaylistMusicResDto of(PlaylistMusic playlistMusic) {
        PlaylistMusicResDto playlistMusicResDto = new PlaylistMusicResDto();
        playlistMusicResDto.playSeq = playlistMusic.getPlay().getPlaySeq();
        playlistMusicResDto.musicSeq = playlistMusic.getMusic().getMusicSeq();
        playlistMusicResDto.playMusicSeq = playlistMusic.getPlayMusicSeq();
        playlistMusicResDto.playMusicOrder = playlistMusic.getPlayMusicOrder();
        playlistMusicResDto.musicName = playlistMusic.getMusic().getMusicName();
        playlistMusicResDto.musicArtist = playlistMusic.getMusic().getMusicArtist();
        playlistMusicResDto.musicRelease = playlistMusic.getMusic().getMusicRelease();
        playlistMusicResDto.musicLikes = playlistMusic.getMusic().getMusicLikes();

        return playlistMusicResDto;
    }







}
