package com.ssafy.slr.USER.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.slr.Content.domain.Cal;
import com.ssafy.slr.Content.domain.Diary;
import com.ssafy.slr.MUSIC.domain.Comment;
import com.ssafy.slr.MUSIC.domain.MusicLike;
import com.ssafy.slr.MUSIC.domain.Playlist;
import com.ssafy.slr.USER.constant.Gender;
import com.ssafy.slr.USER.constant.Role;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
//@Table()
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_seq")
    private Long userSeq;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "user_gender")
    @Enumerated(value = EnumType.STRING)
    private Gender userGender;

    @Column(name = "user_birth")
    private String userBirth;

    @Column(name = "user_nick")
    private String userNick;
@Column
private Role role;
    @Column(name = "user_img")
    private String userImg;

    @Column(name = "user_repocnt")
    private Long userRepocnt;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "access_token")
    private String accessToken;

    @Column(name = "oauth_token")
    private String oauthToken;

    public void updateTokens(String accessToken, String refreshToken){
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private  List<MusicLike> likes = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private  List<Playlist> playLists = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private  List<Cal> calendars = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private  List<Diary> diaries = new ArrayList<>();

    @Builder
    public User(String userNick, String userEmail, String userImg){
        this.userNick = userNick;
        this.userImg = userImg;
        this.userEmail = userEmail;
//        this.userBirth = userBirth;
//        this.userGender = userGender;
    }
    @Builder(builderMethodName = "roleBuilder")
    public User(String userNick, String userEmail, String userImg, Role role){
        this.userNick = userNick;
        this.userImg = userImg;
        this.userEmail = userEmail;
        this.role = role;
    }

    public User update(String userName, String userImg){
        this.userName = userName;
        this.userImg = userImg;

        return this;
    }

    public String getRolekey(){
        return this.role.getKey();
    }
}
