package com.ssafy.slr.Content.dto;

import com.ssafy.slr.Content.domain.Cal;
import com.ssafy.slr.MUSIC.domain.Music;
import com.ssafy.slr.MUSIC.dto.CommentResDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class CalDetailResDto {

    private Long calSeq;
    private Long userSeq;
    private String calYmd;
    private String calEmotion;
//    private String calColor;

    @Setter
    private String diaryContents;
    @Setter
    private String diaryWeather;
    @Setter
    private String musicPicture;
    @Setter
    private String musicName;
    @Setter
    private List<RecMusicResDto> recommendList;

    public CalDetailResDto(Cal cal) {
        this.calYmd = cal.getCalYmd();
        this.calEmotion = cal.getCalEmotion();
//        this.calColor = cal.getCalColor();
        this.calSeq = cal.getCalSeq();
        this.userSeq = cal.getUser().getUserSeq();
    }

}
