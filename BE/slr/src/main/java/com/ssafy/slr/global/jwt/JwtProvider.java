package com.ssafy.slr.global.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtProvider {
    private final Key key;
    public JwtProvider(@Value("gumid209freesubjectprojectyourdayspeaklistenwrite") String secretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }
    private final Long ACCESS_TOKEN_EXPIRED_TIME = 1000L * 60 * 60 * 24 * 7; // 1일
    private final Long REFRESH_TOKEN_EXPIRED_TIME = 1000L * 60 * 60 * 24 * 14;  // 2주

//    accesstoken 정보 정해야함
    public String getAccessToken(Long userSeq, String userEmail, String userNick){
        Claims claims = Jwts.claims().setSubject(userEmail);
        Date now = new Date();


        return Jwts.builder().setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setClaims(createClaims(userSeq, userEmail, userNick))
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + ACCESS_TOKEN_EXPIRED_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
    private Map<String, Object> createClaims(Long userSeq, String userEmail, String userNick) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userSeq", userSeq); // userSeq
        claims.put("userEmail", userEmail); // userEmail
        claims.put("userNick", userNick); // userNick
        return claims;
    }

    public String getRefreshToken(Long userSeq, String userEmail, String userNick){
        Date now = new Date();
        return Jwts.builder().setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setClaims(createClaims(userSeq, userEmail, userNick))
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + REFRESH_TOKEN_EXPIRED_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Integer getUserSeqFromAccessToken(String accessToken) throws Exception{
        Integer  userSeq = Integer.parseInt(String.valueOf(Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody().get("userSeq")));
        return  userSeq;
    }
    public String getUserEmailFromAccessToken(String accessToken) throws Exception {
        String userEmail = (String) Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody().get("userEmail");
        return userEmail;
    }
    public String getUserNickFromAccessToken(String accessToken) throws Exception {
        String userNick = (String) Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody().get("userNick");
        return userNick;
    }

    public boolean isValidToken(String token){
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (Exception e){
            return false;
        }
    }
}
