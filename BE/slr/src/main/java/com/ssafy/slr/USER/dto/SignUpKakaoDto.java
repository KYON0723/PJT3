package com.ssafy.slr.USER.dto;

import com.ssafy.slr.USER.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignUpKakaoDto {

    private String userNick;
    private String userProfileImg;
    private String userEmail;
//    private String userBirth;
//    private Gender userGender;

    public User toSignUpKakaoDto(){
        return User.builder()
                .userNick(userNick)
                .userImg(userProfileImg)
                .userEmail(userEmail)
//                .userBirth(userBirth)
//                .userGender(userGender)
                .build();
    }

}
