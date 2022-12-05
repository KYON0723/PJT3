package com.ssafy.slr.global.config.auth;

import com.ssafy.slr.USER.domain.User;
import com.ssafy.slr.USER.repository.UserRepository;
import com.ssafy.slr.global.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

@RequiredArgsConstructor
public class JwtAuthFilter extends GenericFilterBean {
    private final JwtProvider jwtProvider;

    private final UserRepository userRepository;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        String token = ((HttpServletRequest)request).getHeader("accessToken");
        String email = null;
        String userNick = null;
        try {
            email = jwtProvider.getUserEmailFromAccessToken(token);
            userNick = jwtProvider.getUserNickFromAccessToken(token);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        Optional<User> usero = userRepository.findByUserEmail(email);
        User user = usero.get();
        UserDto userDto = UserDto.of(user);
        System.out.println("token1로 받아온 이메일 : "+email);
        System.out.println("token1로 받아온 이름 : "+userNick);

//            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
           // Authentication auth = getAuthentication(userDto);
           // SecurityContextHolder.getContext().setAuthentication(auth);
        //}



        chain.doFilter(request, response);
    }

    public Authentication getAuthentication(UserDto member) {
        return new UsernamePasswordAuthenticationToken(member, "",
                Arrays.asList(new SimpleGrantedAuthority("ROLE_USER")));


}
}