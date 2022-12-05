package com.ssafy.slr.Content.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.slr.USER.domain.User;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Builder
@AllArgsConstructor
@Setter
//@Table()
public class Cal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cal_seq")
    private Long calSeq;

    @Column(name = "cal_ymd", nullable = false)
    private String calYmd;

    @Column(name = "cal_emotion", nullable = true)
    private String calEmotion;

//    @Column(name = "cal_color", nullable = true)
//    private String calColor;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @JsonManagedReference
    @OneToMany(mappedBy = "cal", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Recommend> recommends = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "cal", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Diary> diaries = new ArrayList<>();


}
