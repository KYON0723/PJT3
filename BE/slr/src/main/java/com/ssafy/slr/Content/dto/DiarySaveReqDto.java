package com.ssafy.slr.Content.dto;

import com.ssafy.slr.Content.domain.Cal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class DiarySaveReqDto {

    private String calYmd;
    private String diaryContent;
    private String diaryWeather;

}
