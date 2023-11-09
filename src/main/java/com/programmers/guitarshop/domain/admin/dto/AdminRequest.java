package com.programmers.guitarshop.domain.admin.dto;

import lombok.Builder;

public class AdminRequest {

    public record AdminDetailRequest(String id, String password) {
        @Builder
        public AdminDetailRequest {
        }
    }
}
