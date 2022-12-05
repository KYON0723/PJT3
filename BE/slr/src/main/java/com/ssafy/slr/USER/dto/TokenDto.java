package com.ssafy.slr.USER.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
public class TokenDto {
    private String accessToken;
    private String refreshToken;
    private String userNick;

    @Builder
    public static TokenDto of(String accessToken, String refreshToken, String userNick) {
        return TokenDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .userNick(userNick)
                .build();
    }
}