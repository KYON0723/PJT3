package com.ssafy.slr.MUSIC.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_seq")
    private Long commentSeq;

    @Column(name = "comment", nullable = false)
    private String comment;

    @Temporal(TemporalType.TIMESTAMP)
//    @Setter
    @Column(name = "comment_date", nullable = false, columnDefinition = "timestamp")
    private Date commentDate;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "music_seq")
    private Music music;


}
