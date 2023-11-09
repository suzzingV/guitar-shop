package com.programmers.guitarshop.dto;

import com.programmers.guitarshop.domain.Customer;
import com.programmers.guitarshop.domain.Guitar;
import com.programmers.guitarshop.domain.Order;
import lombok.Builder;

import java.time.LocalDate;
import java.util.UUID;

public class OrderResponse {
    public record OrderDetailResponse(UUID orderId, String name, String address, Customer customer, String phoneNum, String paymentMethod, UUID guitarId, int quantity) {
        @Builder
        public OrderDetailResponse {
        }
    }

    public static OrderDetailResponse toOrderDetailResponse(Order order) {
        return OrderDetailResponse.builder()
                .orderId(order.getOrderId())
                .name(order.getName())
                .address(order.getAddress())
                .customer(order.getCustomer())
                .phoneNum(order.getPhoneNum())
                .paymentMethod(order.getPaymentMethod())
                .guitarId(order.getGuitarId())
                .quantity(order.getQuantity())
                .build();
    }
}
