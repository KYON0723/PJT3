package com.ssafy.slr.global.config.auth;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@NoArgsConstructor
@Getter
class Token {
    private String accessToken;
    private String refreshToken;

    public Token(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public static Token onlyAccessToken(String accessToken){
        Token temp = new Token();
        temp.accessToken = accessToken;
        temp.refreshToken = "";
        return temp;
    }
}