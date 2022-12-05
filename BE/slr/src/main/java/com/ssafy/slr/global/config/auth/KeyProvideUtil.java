package com.ssafy.slr.global.config.auth;

import io.jsonwebtoken.security.Keys;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Map;

@Component
@Setter
@ConfigurationProperties(prefix = "jwt")
@PropertySource(value = {"classpath:/application.yml"})
public class KeyProvideUtil {
    private Map<String,String> key;

    private final String keyPrefix = "key";
    public Pair<String,String> getRandomKey(){

        int size = key.size();
        int randomIndex = (int)((Math.random()*10000)%size); //0<= x < size

        String selectedKey =keyPrefix + randomIndex;
        String value = key.get(selectedKey);

        return new Pair<>(selectedKey,value);

    }

    public Key getKeyValue(String keyId){

        String keyString = key.get(keyId);
        if(!StringUtils.hasLength(keyString))
            return null;

        Key returnKey = Keys.hmacShaKeyFor(keyString.getBytes(StandardCharsets.UTF_8));

        return returnKey;
    }

}
