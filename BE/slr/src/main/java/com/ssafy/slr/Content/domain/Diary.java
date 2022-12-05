package com.ssafy.slr.Content.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ssafy.slr.MUSIC.domain.Music;
import com.ssafy.slr.USER.domain.User;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Builder
@AllArgsConstructor
//@Table()
public class Diary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "diary_seq")
    private Long diarySeq;

    @Column(name = "diary_content", nullable = false)
    private String diaryContent;

    @Column(name = "diary_weather")
    private String diaryWeather;

//    @Temporal(TemporalType.TIMESTAMP)
//    @Setter
//    @Column(name = "diary_ymd", nullable = false, updatable = false)
//    private Date diaryYmd;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cal_seq")
    private Cal cal;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;
}
