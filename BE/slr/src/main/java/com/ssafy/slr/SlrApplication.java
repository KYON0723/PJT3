package com.ssafy.slr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


@SpringBootApplication
@EnableJpaAuditing
public class SlrApplication {

	public static void main(String[] args) {
		SpringApplication.run(SlrApplication.class, args);
	}
}