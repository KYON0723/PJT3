package com.ssafy.slr.Content.dto;

import com.ssafy.slr.MUSIC.domain.Music;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class RecommendMusicResDto {

    private Long recSeq;

    private Long calSeq;

    private Long musicSeq;

    private Boolean recMain;

}
