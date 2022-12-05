package com.ssafy.slr.Content.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class EmotionResDto {

    private String emotion;
    private List<Long> recommendList;

}
