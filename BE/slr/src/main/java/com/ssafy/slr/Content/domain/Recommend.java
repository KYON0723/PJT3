package com.ssafy.slr.Content.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ssafy.slr.MUSIC.domain.Music;
import com.ssafy.slr.USER.domain.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
//@Table()
public class Recommend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rec_seq")
    private Long recSeq;

    @Column(name = "rec_main", nullable = false)
    private Boolean recMain;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "music_seq")
    private Music music;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cal_seq")
    private Cal cal;
}
