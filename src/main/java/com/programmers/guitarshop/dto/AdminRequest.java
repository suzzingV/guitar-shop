package com.programmers.guitarshop.dto;

import lombok.Builder;

public class AdminRequest {

    public record AdminDetailRequest(String id, String password) {
        @Builder
        public AdminDetailRequest {
        }
    }
}
