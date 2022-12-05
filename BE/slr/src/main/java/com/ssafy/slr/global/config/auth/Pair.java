package com.ssafy.slr.global.config.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Pair<K,V>{
    private K first;
    private V second;
}
