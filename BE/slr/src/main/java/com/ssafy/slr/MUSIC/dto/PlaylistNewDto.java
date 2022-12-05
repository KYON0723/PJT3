package com.ssafy.slr.MUSIC.dto;

import com.ssafy.slr.MUSIC.domain.Playlist;
import com.ssafy.slr.MUSIC.domain.PlaylistMusic;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class PlaylistNewDto {
    private Long playSeq;
    private Long userSeq;
    private String playName;
    private int playPriority;
    private List<PlaylistMusicResDto> playlistMusics;

    public static PlaylistNewDto of(Playlist playlist) {
        PlaylistNewDto playlistResDto = new PlaylistNewDto();
        playlistResDto.playSeq = playlist.getPlaySeq();
        playlistResDto.userSeq = playlist.getUser().getUserSeq();
        playlistResDto.playName = playlist.getPlayName();
        playlistResDto.playPriority = playlist.getPlayPriority();

        return playlistResDto;
    }
}
