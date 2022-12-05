package com.ssafy.slr.USER.repository;


import com.ssafy.slr.USER.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserSeq(Long userSeq);
    Optional<User> findByUserEmail(String userEmail);

    @Query("SELECT u FROM User u WHERE u.userEmail=:userEmail")
    User findKakaoUser(@Param("userEmail") String userEmail);
}
