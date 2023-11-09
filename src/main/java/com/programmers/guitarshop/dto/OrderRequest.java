package com.programmers.guitarshop.dto;

import lombok.Builder;

public class OrderRequest {

    public record OrderDetailRequest(String name, String address, String customerId, String password, String phoneNum, String paymentMethod) {
        @Builder
        public OrderDetailRequest {
        }
    }

    public record CreateOrderRequest(String name, String address, String customerId, String password, String phoneNum, String paymentMethod) {
        @Builder
        public CreateOrderRequest {
        }
    }
}
