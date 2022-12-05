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
public class PlaylistResDto {

    private Long playSeq;
    private Long userSeq;
    private String playName;
    private int playPriority;

    private List<PlaylistMusic> playlistMusics;

    public static PlaylistResDto of(Playlist playlist) {
        PlaylistResDto playlistResDto = new PlaylistResDto();
        playlistResDto.playSeq = playlist.getPlaySeq();
        playlistResDto.userSeq = playlist.getUser().getUserSeq();
        playlistResDto.playName = playlist.getPlayName();
        playlistResDto.playPriority = playlist.getPlayPriority();
        playlistResDto.playlistMusics = playlist.getPlaylistMusics();

        return playlistResDto;
    }

    public static ArrayList<PlaylistResDto> ofList(List<Playlist> playlists){
        ArrayList<PlaylistResDto> playlistResDtoArrayList = new ArrayList<>();
        PlaylistMusic playlistMusic ;
        int i=0;
        while(i<playlists.size()){
            PlaylistResDto playlistResDto = new PlaylistResDto();
            playlistResDto.userSeq = playlists.get(i).getUser().getUserSeq();
            playlistResDto.playPriority = playlists.get(i).getPlayPriority();
            playlistResDto.playSeq = playlists.get(i).getPlaySeq();
            playlistResDto.playName = playlists.get(i).getPlayName();
            
            playlistResDto.playlistMusics = playlists.get(i).getPlaylistMusics();

            playlistResDtoArrayList.add(playlistResDto);
            i++;
        }
        return playlistResDtoArrayList;
    }





}
