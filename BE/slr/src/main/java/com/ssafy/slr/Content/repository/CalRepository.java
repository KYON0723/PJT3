package com.ssafy.slr.Content.repository;

import com.ssafy.slr.Content.domain.Cal;
import com.ssafy.slr.Content.dto.CalDetailResDto;
import com.ssafy.slr.Content.dto.CalResDto;
import com.ssafy.slr.USER.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CalRepository extends JpaRepository<Cal, Long> {

    List<CalResDto> findAllByUserAndCalYmdStartsWith(Optional<User> user, String calYm);


    CalDetailResDto findByUserAndCalYmd(User user, String calYmd);

    Cal findByCalSeq(Long calSeq);

    Cal findByCalYmdAndUser(String calYmd, User user);
}
