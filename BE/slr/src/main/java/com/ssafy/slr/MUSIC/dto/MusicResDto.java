package com.ssafy.slr.MUSIC.dto;

import com.ssafy.slr.MUSIC.domain.Music;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class MusicResDto {

    private Long musicSeq;
    private String musicName;
    private String musicArtist;
    private String musicRelease;
    private int musicLikes;
    private String musicLyrics;
    private String musicPicture;
    private String musicPath;

    @Setter
    private boolean isUserMusicLike;

    @Setter
    private List<RecMusicListDto> recMusicList;

    @Setter
    private List<CommentResDto> commentList;

    public MusicResDto(Music music) {
        this.musicSeq = music.getMusicSeq();
        this.musicName = music.getMusicName();
        this.musicArtist = music.getMusicArtist();
        this.musicPicture = music.getMusicPicture() + ".jpg";
        this.musicRelease = music.getMusicRelease();
        this.musicLikes = music.getMusicLikes();
        this.musicLyrics = music.getMusicLyrics() + ".lrc";
        this.musicPath = music.getMusicPath() + ".mp3";
    }
    public MusicResDto() {

    }
    public static ArrayList<MusicResDto> ofList(List<Music> musicList){
        ArrayList<MusicResDto> listMusicResDto = new ArrayList<>();
        int i=0;
        while(i<musicList.size()){
            MusicResDto musicResDto = new MusicResDto();
            musicResDto.musicSeq = musicList.get(i).getMusicSeq();
            musicResDto.musicName = musicList.get(i).getMusicName();
            musicResDto.musicArtist = musicList.get(i).getMusicArtist();
            musicResDto.musicPicture = musicList.get(i).getMusicPicture()+".jpg";
            musicResDto.musicRelease = musicList.get(i).getMusicRelease();
            musicResDto.musicLikes = musicList.get(i).getMusicLikes();
            musicResDto.musicLyrics = musicList.get(i).getMusicLyrics()+".lrc";
            musicResDto.musicPath = musicList.get(i).getMusicPath()+".mp3";

            listMusicResDto.add(musicResDto);
            i++;
        }
        return listMusicResDto;
    }

}
