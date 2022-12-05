package com.ssafy.slr.global.config.auth;

import com.ssafy.slr.USER.constant.Role;
import com.ssafy.slr.USER.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class UserDto {
    private Long userSeq;
    private String email;
    private String name;
    private String picture;
    private Role role;

    @Builder
    public UserDto(String email, String name, String picture) {
        this.email = email;
        this.name = name;
        this.picture = picture;
    }

    public static UserDto of(User user){
        UserDto userDto = new UserDto();
        userDto.userSeq = user.getUserSeq();
        userDto.name = user.getUserName();
        userDto.picture = user.getUserImg();
        userDto.role = user.getRole();
        userDto.email = user.getUserEmail();
        return userDto;
    }

}