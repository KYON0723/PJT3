package com.ssafy.slr.MUSIC.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class RecMusicsReqDto {

    private Long musicSeq;
    private List<Long> playListMusicsList;

}
