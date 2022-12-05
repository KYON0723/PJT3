package com.ssafy.slr.global.config.auth;

import com.ssafy.slr.global.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RequiredArgsConstructor
@RestController
public class TokenController {
    private final JwtProvider jwtProvider;

    @GetMapping("/token/expired")
    public String auth() {
        throw new RuntimeException();
    }

    @GetMapping("/token/refresh")
    public String refreshAuth(HttpServletRequest request, HttpServletResponse response) {
        String token = request.getHeader("refreshToken");
        if (token != null && jwtProvider.isValidToken(token)) {
            System.out.println(token);
            Integer userSeq = null;
            String email = null;
            String userNick = null;
            try {
                email = jwtProvider.getUserEmailFromAccessToken(token);
                System.out.println("controller email" + email);
                userSeq = jwtProvider.getUserSeqFromAccessToken(token);
                System.out.println("controller userSeq" + userSeq);
                userNick = jwtProvider.getUserNickFromAccessToken(token);
                System.out.println("controller userNick" + userNick);

            } catch (Exception e) {
                throw new RuntimeException(e);
            }
            String newToken = jwtProvider.getAccessToken(Long.valueOf(userSeq), email, userNick);

            response.addHeader("accessToken", newToken);
            response.addHeader("refreshToken", token);
            response.setContentType("application/json;charset=UTF-8");

            return "HAPPY NEW TOKEN";
        }

        throw new RuntimeException();
    }
}
