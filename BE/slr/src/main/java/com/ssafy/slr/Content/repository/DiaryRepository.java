package com.ssafy.slr.Content.repository;

import com.ssafy.slr.Content.domain.Cal;
import com.ssafy.slr.Content.domain.Diary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    Diary findByCal(Cal calEntity);
}
