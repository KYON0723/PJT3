package com.ssafy.slr.USER.controller;

import com.ssafy.slr.USER.dto.CodeDto;
import com.ssafy.slr.USER.dto.TokenDto;
import com.ssafy.slr.USER.service.LoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/oauth")
public class LoginController {

    private final LoginService loginService;

//    @ResponseBody
    @PostMapping("/kakao")
//    public TokenDto kakaoCallback(@RequestParam String code) {
    public TokenDto kakaoCallback(@RequestBody CodeDto codeDto) {

        System.out.println("code : " + codeDto.getCode());
        String accessToken = loginService.getKaKaoAccessToken(codeDto.getCode());
        TokenDto tokenDto = loginService.getUserInfo(accessToken);
        System.out.println("KakaoAccessToken : " + accessToken);
        System.out.println("JwtAccessToken : " + tokenDto.getAccessToken());
        System.out.println("JwtRefreshToken : " + tokenDto.getRefreshToken());
        return tokenDto;
    }

//    @GetMapping("")
//    public TokenDto kakaoCallback(@RequestParam String code) {
//
//        System.out.println("code : " + code);
//        String accessToken = loginService.getKaKaoAccessToken(code);
//        TokenDto tokenDto = loginService.getUserInfo(accessToken);
//        System.out.println("KakaoAccessToken : " + accessToken);
//        System.out.println("JwtAccessToken : " + tokenDto.getAccessToken());
//        System.out.println("JwtRefreshToken : " + tokenDto.getRefreshToken());
//        return tokenDto;
//    }

}
