package com.ssafy.slr.Content.repository;

import com.ssafy.slr.Content.domain.Question;
import com.ssafy.slr.Content.dto.QuestionResDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question,Long> {
    QuestionResDto findByQuestionSeq(Long questionSeq);

}
