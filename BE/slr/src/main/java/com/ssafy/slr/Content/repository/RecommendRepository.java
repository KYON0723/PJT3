package com.ssafy.slr.Content.repository;

import com.ssafy.slr.Content.domain.Cal;
import com.ssafy.slr.Content.domain.Recommend;
import com.ssafy.slr.Content.dto.CalResDto;
import com.ssafy.slr.Content.dto.RecommendMusicResDto;
import com.ssafy.slr.MUSIC.domain.Music;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RecommendRepository extends JpaRepository<Recommend, Long> {

    @Query("SELECT r FROM Recommend r Where r.cal.calSeq=:calSeq And r.recMain=:b")
    Recommend findByCalSeqAndRecMain(@Param("calSeq") Long calSeq, @Param("b") boolean b);


    List<Recommend> findAllByCal(Cal calEntity);


}
