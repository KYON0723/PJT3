package com.ssafy.slr.USER.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.ssafy.slr.MUSIC.service.PlaylistService;
import com.ssafy.slr.USER.domain.User;
import com.ssafy.slr.USER.dto.SignUpKakaoDto;
import com.ssafy.slr.USER.dto.TokenDto;
import com.ssafy.slr.USER.repository.UserRepository;
import com.ssafy.slr.global.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final PlaylistService playlistService;

    public String getKaKaoAccessToken(String code){
        String access_Token="";
        String refresh_Token ="";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        try{
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=a04a1ff92991fc9f2ca74a09006f3d3c"); // Kakao REST_API_KEY 입력
//            Local
//            sb.append("&redirect_uri=http://localhost:8081/user/login/kakao"); // Kakao 인가코드 받은 redirect_uri 입력
//            Server
//            sb.append("&redirect_uri=https://k7d209.p.ssafy.io:8443/user/login/kakao"); // Kakao 인가코드 받은 redirect_uri 입력
//            Front
            sb.append("&redirect_uri=https://k7d209.p.ssafy.io/user/login/kakao"); // Kakao 인가코드 받은 redirect_uri 입력

            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);
            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            access_Token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

            System.out.println("access_token : " + access_Token);
            System.out.println("refresh_token : " + refresh_Token);

            br.close();
            bw.close();
        }catch (IOException e) {
            e.printStackTrace();
        }

        return access_Token;
    }

//    public void createKakaoUser(String token) {
//
//        String reqURL = "https://kapi.kakao.com/v2/user/me";
//
//        User userEntity = null;
//
//        //access_token을 이용하여 사용자 정보 조회
//        try {
//            URL url = new URL(reqURL);
//            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//
//            conn.setRequestMethod("POST");
//            conn.setDoOutput(true);
//            conn.setRequestProperty("Authorization", "Bearer " + token); //전송할 header 작성, access_token전송
//
//
//            //결과 코드가 200이라면 성공
//            int responseCode = conn.getResponseCode();
//            System.out.println("responseCode : " + responseCode);
//
//            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
//            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//            String line = "";
//            String result = "";
//
//            while ((line = br.readLine()) != null) {
//                result += line;
//            }
//            System.out.println("response body : " + result);
//            JsonParser parser = new JsonParser();
//            JsonElement element = parser.parse(result);
//            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
//            JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();
////            String nickname = properties.getAsJsonObject().get("nickname").getAsString();
//            String email = kakao_account.getAsJsonObject().get("email").getAsString();
//
//
//            br.close();
//
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }

    public TokenDto getUserInfo(String accessToken) {
//        HashMap<String, Object> userInfo = new HashMap<String, Object>();
        SignUpKakaoDto signUpKakaoDto = new SignUpKakaoDto();
        String reqURL = "https://kapi.kakao.com/v2/user/me";
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Authorization", "Bearer " + accessToken);
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";
            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);
            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
            JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();

            String nickname = "";
            String profile_image = "";
            String email = "";

            nickname = properties.getAsJsonObject().get("nickname").getAsString();
            profile_image = properties.getAsJsonObject().get("profile_image").getAsString();
            email = kakao_account.getAsJsonObject().get("email").getAsString();
//            gender = kakao_account.getAsJsonObject().get("gender").getAsString();
//            birth = kakao_account.getAsJsonObject().get("birthday").getAsString();
            boolean hasEmail = kakao_account.get("has_email").getAsBoolean();
//            boolean hasBirth = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_birthday").getAsBoolean();
//            boolean hasGender = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_gender").getAsBoolean();

            signUpKakaoDto.setUserNick(nickname);
            signUpKakaoDto.setUserProfileImg(profile_image);

            if (hasEmail) {
                signUpKakaoDto.setUserEmail(email);
            }
//            if (hasBirth) {
//                signUpKakaoDto.setUserBirth(birth);
//            }
//            if (hasGender) {
//                System.out.println();
//                if( gender == "male"){
//                    signUpKakaoDto.setUserGender(Gender.MALE);
//                }
//                else if ( gender == "female"){
//                    signUpKakaoDto.setUserGender(Gender.FEMALE);
//                }
//                else {
//                    signUpKakaoDto.setUserGender(Gender.NONE);
//                }
//            }

            System.out.println("1nick : " + signUpKakaoDto.getUserNick());

        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("2nick : " + signUpKakaoDto.getUserNick());
        User test = userRepository.findKakaoUser(signUpKakaoDto.getUserEmail());

        System.out.println("test :" + test);
//        회원가입
        if (test == null){
            User userEntity = signUpKakaoDto.toSignUpKakaoDto();
            System.out.println("signUp : " + signUpKakaoDto.getUserNick());

            userRepository.save(userEntity);
            User result = userRepository.findKakaoUser(signUpKakaoDto.getUserEmail());
            String accessTokenJwt = jwtProvider.getAccessToken(result.getUserSeq(), result.getUserEmail(), result.getUserNick());
            String refreshToken = jwtProvider.getRefreshToken(result.getUserSeq(), result.getUserEmail(), result.getUserNick());
            result.updateTokens(accessTokenJwt,refreshToken);
            userRepository.save(result);

            // 유저 생성 시 플레이 리스트 3개 생성
            String playListName1 = "플레이리스트 1";
            String playListName2 = "플레이리스트 2";
            String playListName3 = "플레이리스트 3";
            playlistService.createPlaylist(result.getUserSeq(), playListName1);
            playlistService.createPlaylist(result.getUserSeq(), playListName2);
            playlistService.createPlaylist(result.getUserSeq(), playListName3);
            return new TokenDto(accessTokenJwt, refreshToken, result.getUserNick());
        }
//        로그인
        else {
            System.out.println("signIn : " + signUpKakaoDto.getUserNick());
            String accessTokenJwt = jwtProvider.getAccessToken(test.getUserSeq(), test.getUserEmail(), test.getUserNick());
            String refreshToken = jwtProvider.getRefreshToken(test.getUserSeq(), test.getUserEmail(), test.getUserNick());
            test.updateTokens(accessTokenJwt, refreshToken);
            userRepository.save(test);
            return new TokenDto(accessTokenJwt, refreshToken, test.getUserNick());
        }
    }

}
