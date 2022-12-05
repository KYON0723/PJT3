package com.ssafy.slr.Content.dto;

import com.ssafy.slr.Content.domain.Cal;
import com.ssafy.slr.MUSIC.domain.Music;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RecMusicSaveDto {

    private Long recSeq;
    private Music music;
    private Cal cal;
    private Boolean recMain;
}
