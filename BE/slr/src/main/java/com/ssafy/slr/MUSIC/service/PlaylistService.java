package com.ssafy.slr.MUSIC.service;

import com.ssafy.slr.Content.dto.PlayListMusicsDto;
import com.ssafy.slr.MUSIC.domain.Music;
import com.ssafy.slr.MUSIC.domain.Playlist;
import com.ssafy.slr.MUSIC.domain.PlaylistMusic;
import com.ssafy.slr.MUSIC.dto.PlaylistMusicResDto;
import com.ssafy.slr.MUSIC.dto.PlaylistNewDto;
import com.ssafy.slr.MUSIC.dto.PlaylistResDto;
import com.ssafy.slr.MUSIC.repository.MusicRepository;
import com.ssafy.slr.MUSIC.repository.PlaylistMusicRepository;
import com.ssafy.slr.MUSIC.repository.PlaylistRepository;
import com.ssafy.slr.USER.domain.User;
import com.ssafy.slr.USER.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlaylistService {

    private final MusicRepository musicRepository;
    private final UserRepository userRepository;
    private final PlaylistRepository playlistRepository;
    private final PlaylistMusicRepository playlistMusicRepository;


    public PlaylistResDto createPlaylist(Long userSeq, String playName){

        User user = userRepository.findByUserSeq(userSeq);
        List<Playlist> playlists = playlistRepository.findAllByUser_UserSeq(userSeq);

        Playlist playlist = Playlist.builder()
                .playName(playName)
                .user(user)
                .playPriority(playlists.size()+1)
                .build();

        return PlaylistResDto.of(playlistRepository.save(playlist));
    }

    public List<PlaylistNewDto> getPlaylist(Long userSeq){
        List<Playlist> playlists = playlistRepository.findAllByUser_UserSeq(userSeq);
        List<PlaylistNewDto> result = new ArrayList<>();

        for(int i=0; i<playlists.size(); i++){
            PlaylistNewDto a = PlaylistNewDto.of(playlists.get(i));
            List<PlaylistMusic> playlistMusics = playlists.get(i).getPlaylistMusics();
            List<PlaylistMusicResDto> playlistMusicResDtos = new ArrayList<>();
            for(PlaylistMusic b : playlistMusics){
                PlaylistMusicResDto playlistMusicResDto = PlaylistMusicResDto.of(b);
                playlistMusicResDtos.add(playlistMusicResDto);
            }
            a.setPlaylistMusics(playlistMusicResDtos);
            result.add(a);
        }

        return result;
    }


    public List<PlaylistMusicResDto> getPlaylistmusic(Long playSeq){
        Optional<Playlist> playlistOptional = playlistRepository.findById(playSeq);
        Playlist playlist = playlistOptional.get();
        if(playlistOptional.isPresent()){
            List<PlaylistMusic> playlistMusics = playlist.getPlaylistMusics();
            playlistMusics = playlistMusics.stream().sorted(Comparator.comparing(PlaylistMusic::getPlayMusicOrder)).collect(Collectors.toList());
            List<PlaylistMusicResDto> playlistMusicResDtos = new ArrayList<>();
            for(PlaylistMusic a : playlistMusics){
                PlaylistMusicResDto playlistMusicResDto = PlaylistMusicResDto.of(a);
                playlistMusicResDtos.add(playlistMusicResDto);
            }
            return playlistMusicResDtos;
        }
        return null;
    }

    public void updatePlaylist(PlaylistResDto playlistDto) {

        Optional<Playlist> playlistOptional = playlistRepository.findByPlaySeq(playlistDto.getPlaySeq());

        User user = userRepository.findByUserSeq(playlistDto.getUserSeq());

        Playlist playlist = playlistOptional.get();

        playlist.updatePlaylist(playlistDto.getPlayName(), playlistDto.getPlayPriority());

    }

    public int deletePlaylist(Long playSeq){
        Optional<Playlist> playlistOptional = playlistRepository.findByPlaySeq(playSeq);
        Playlist playlist = playlistOptional.get();
        if(playlistOptional.isPresent()){
            playlistRepository.deleteById(playSeq);

            Optional<Playlist> playlist1 = playlistRepository.findByPlaySeq(playSeq);
            if(!playlist1.isPresent()) {
                List<Playlist> playlists = playlistRepository.findAllByUser_UserSeq(playlist.getUser().getUserSeq());
                for(Playlist a : playlists){
                    if(a.getPlayPriority()>playlist.getPlayPriority()){
                        a.setPlayPriority(a.getPlayPriority() - 1);
                    }
                }
            }

            return 1;
        }
        else
            return 0;

    }

    public List<PlaylistMusic> addMusics(Long playSeq, List<Map<String, Object>> musiclist){

        List<PlaylistMusic> list = playlistMusicRepository.findAllByPlay_PlaySeq(playSeq);

        for(int i=0; i<list.size(); i++){
            playlistMusicRepository.deleteById(list.get(i).getPlayMusicSeq());
        }
        Optional<Playlist> playlistOptional = playlistRepository.findByPlaySeq(playSeq);
        Playlist playlist = playlistOptional.get();
        List<PlaylistMusic> playlistMusics = playlist.getPlaylistMusics();
        for(int i=0; i<musiclist.size(); i++){
            Long musicSeq = Long.parseLong(String.valueOf(musiclist.get(i).get("musicSeq")));
            Music music = musicRepository.findByMusicSeq(musicSeq);


            PlaylistMusic playlistMusic = PlaylistMusic.builder()
                    .play(playlist)
                    .music(music)
                    .playMusicOrder((Integer)musiclist.get(i).get("playMusicOrder"))
                    .build();

            playlistMusics.add(playlistMusic);

            playlist.setPlaylistMusics(playlistMusics);
            playlistMusicRepository.save(playlistMusic);
        }

//        for(Long musicSeq : musicSeqlist){
//            Music music = musicRepository.findByMusicSeq(musicSeq);
//
//            Optional<PlaylistMusic> playlistMusicOptional = playlistMusicRepository.findByPlay_PlaySeqAndMusic_MusicSeq(playSeq, musicSeq);
//
//            if(!playlistMusicOptional.isPresent()) {//중복추가 방지
//                PlaylistMusic playlistMusic = PlaylistMusic.builder()
//                        .play(playlist)
//                        .music(music)
//                        .playMusicOrder(playlistMusics.size() + 1)
//                        .build();
//
//                playlistMusics.add(playlistMusic);
//
//                playlist.setPlaylistMusics(playlistMusics);
//                playlistMusicRepository.save(playlistMusic);
//            }
//        }
        if(playlistMusics==null) return null;
        return playlistMusics;
    }

    public List<Long> getMusicsInPlayList(Long userSeq) {
        log.info("getMusicsInPlayList start");
        List<Playlist> userPlayLists = playlistRepository.findAllByUser_UserSeq(userSeq);
        if (userPlayLists.size() > 0){
            log.info(userPlayLists.get(0).getPlayName());
            int sum = 0;
            List<Long> musicsInPlayLists = new ArrayList<>();
            for (int i = 0; i < userPlayLists.size(); i++) {
                List<PlaylistMusic> playListMusics = playlistMusicRepository.findAllByPlay(userPlayLists.get(i));
                log.info(playListMusics.get(0).getMusic().getMusicPath());
                for(int j = 0; j < playListMusics.size(); j++){
                    musicsInPlayLists.add(sum + j, Long.valueOf(String.valueOf(playListMusics.get(j).getMusic().getMusicSeq())));
                    log.info(String.valueOf(musicsInPlayLists.get(j)));
                }
                sum += playListMusics.size();
            }
            return musicsInPlayLists;
        }
        else {
            List<Long> newList = new ArrayList<>();
            return newList;
        }

    }

//    @Transactional
//    public int deletePlaylistMusic(Long playSeq, Long musicSeq){
//
//        Optional<PlaylistMusic> deleteOptinal = playlistMusicRepository.findByPlay_PlaySeqAndMusic_MusicSeq(playSeq, musicSeq);
//
//        if(deleteOptinal.isPresent() ){
//
//            PlaylistMusic delete = deleteOptinal.get();
//            int del = delete.getPlayMusicOrder();
//            playlistMusicRepository.deleteById(delete.getPlayMusicSeq());
//
//            Optional<Playlist> playlistOptional = playlistRepository.findByPlaySeq(playSeq);
//            Playlist playlist = playlistOptional.get();
//
//            List<PlaylistMusic> playlistMusics = playlist.getPlaylistMusics();
//            Optional<PlaylistMusic> deleteOptinal2 = playlistMusicRepository.findByPlay_PlaySeqAndMusic_MusicSeq(playSeq, musicSeq);
//
//
//            if(!deleteOptinal2.isPresent()){ //삭제하면 뒷 순서인 음악 순서 하나씩 감소
//                for(PlaylistMusic a : playlistMusics){
//                    if(a.getPlayMusicOrder() > del)
//                        a.setPlayMusicOrder(a.getPlayMusicOrder()-1);
//                }
//            }
//
//
//            return 1;
//        }else return 0;
//
//    }
//
//
//    public void updatePlaylistMusic(List<Map<String, Object>> musiclists) {
//
//        for(int i=0; i<musiclists.size(); i++){
//            Long playSeq = Long.parseLong(String.valueOf(musiclists.get(i).get("playSeq")));
//            Long musicSeq = Long.parseLong(String.valueOf(musiclists.get(i).get("musicSeq")));
//            Optional<PlaylistMusic> playlistMusicOptional = playlistMusicRepository.findByPlay_PlaySeqAndMusic_MusicSeq(playSeq,musicSeq);
//            if(playlistMusicOptional.isPresent()){
//                PlaylistMusic playlistMusic = playlistMusicOptional.get();
//                int playMusicOrder = (Integer)musiclists.get(i).get("playMusicOrder");
//                playlistMusic.updateMusiclist(playMusicOrder);
//            }
//        }
//
//    }

}
