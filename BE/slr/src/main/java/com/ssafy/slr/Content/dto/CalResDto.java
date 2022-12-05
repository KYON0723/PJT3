package com.ssafy.slr.Content.dto;

import com.ssafy.slr.Content.domain.Cal;
import com.ssafy.slr.Content.domain.Recommend;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
@AllArgsConstructor
public class CalResDto {

    private Long calSeq;

    private Long userSeq;

    private String calYmd;

    private String calEmotion;

//    private String calColor;

    @Setter
    private String musicPicture;

    @Setter
    private String musicName;

    public CalResDto (Cal cal) {
        this.calSeq = cal.getCalSeq();
        this.userSeq = cal.getUser().getUserSeq();
        this.calYmd = cal.getCalYmd();
        this.calEmotion = cal.getCalEmotion();
//        this.calColor = cal.getCalColor();
    }

}
