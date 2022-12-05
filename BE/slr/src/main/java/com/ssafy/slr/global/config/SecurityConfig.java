package com.ssafy.slr.global.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.web.cors.CorsUtils;

@Slf4j
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http ) throws Exception {

        http.csrf().disable();
//        http.headers().frameOptions().sameOrigin();
        http.authorizeRequests()
                .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
                .antMatchers( "/users", "/users/login","/swagger-ui.html/*", "/swagger-ui.html", "/swagger-ui.html/**", "/swagger-resources", "/swagger-resources/**", "/v3/*", "/v3").permitAll()
                .anyRequest().permitAll();
    }
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web ->
                web.ignoring()
                        .antMatchers(
                                 "/users", "/users/login",
                                "/swagger-ui.html/*", "/swagger-ui.html", "/swagger-ui.html/**", "/swagger-resources", "/swagger-resources/**",
                                "/v3/*", "/v3"
                        );
    }
}