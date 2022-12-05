package com.ssafy.slr.global.config.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.slr.USER.domain.User;
import com.ssafy.slr.USER.repository.UserRepository;
import com.ssafy.slr.global.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final UserRequestMapper userRequestMapper;
    private final ObjectMapper objectMapper;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();
        UserDto userDto = userRequestMapper.toDto(oAuth2User);


        log.info("Principal에서 꺼낸 OAuth2User = {}", oAuth2User);
        // 최초 로그인이라면 회원가입 처리를 한다.
        String targetUrl;
        log.info("토큰 발행 시작");
        System.out.println(userDto.getEmail());
        Token token = null;
        Optional<User> testo = userRepository.findByUserEmail(userDto.getEmail());
        if(testo.isEmpty()){
            User test = User.roleBuilder()
                    .userEmail(userDto.getEmail())
                    .userImg(userDto.getPicture())
                    .userNick(userDto.getName())
                    .role(userDto.getRole())
                    .build();

            System.out.println("Sign up : " + test.getUserNick());
            userRepository.save(test);

            Optional<User> resulto = userRepository.findByUserEmail(userDto.getEmail());

            if(resulto.isPresent()){
                System.out.println("Sign up success");
                User result = resulto.get();
                String accessTokenJwt = jwtProvider.getAccessToken(result.getUserSeq(), result.getUserEmail(), result.getUserName());
                String refreshToken = jwtProvider.getRefreshToken(result.getUserSeq(), result.getUserEmail(), result.getUserName());
                result.updateTokens(accessTokenJwt, refreshToken);
                userRepository.save(result);


                token = new Token(accessTokenJwt, refreshToken);
                System.out.println(token.getAccessToken());
                System.out.println(accessTokenJwt);
                System.out.println(token.getRefreshToken());
                System.out.println(refreshToken);


            }
        }else{
            User test = testo.get();
            System.out.println("Sign in : " + test.getUserNick());
            String accessTokenJwt = jwtProvider.getAccessToken(test.getUserSeq(), test.getUserEmail(), test.getUserNick());
            String refreshToken = jwtProvider.getRefreshToken(test.getUserSeq(), test.getUserEmail(), test.getUserNick());
            test.updateTokens(accessTokenJwt, refreshToken);
            System.out.println(accessTokenJwt);
            System.out.println(refreshToken);

            userRepository.save(test);

            token = new Token(accessTokenJwt, refreshToken);

        }
        writeTokenResponse(response, token);

    }

//        targetUrl = UriComponentsBuilder.fromUriString("/home")
//                .queryParam("token", "token")
//                .build().toUriString();
//        getRedirectStrategy().sendRedirect(request, response, targetUrl);
      //  writeTokenResponse(response, token);
//    }

    private void writeTokenResponse(HttpServletResponse response, Token token)
            throws IOException {
        response.setContentType("text/html;charset=UTF-8");

        response.addHeader("accessToken", token.getAccessToken());
        response.addHeader("refreshToken", token.getRefreshToken());
        response.setContentType("application/json;charset=UTF-8");

        var writer = response.getWriter();
        writer.println(objectMapper.writeValueAsString(token));
        writer.flush();
    }
}