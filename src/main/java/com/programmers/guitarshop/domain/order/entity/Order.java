package com.programmers.guitarshop.domain.order.entity;

import com.programmers.guitarshop.domain.customer.entity.Customer;
import lombok.Getter;

import java.util.UUID;

@Getter
public class Order {
    private final UUID orderId;
    private final String name;
    private final String address;
    private final Customer customer;
    private final String phoneNum;
    private final String paymentMethod;
    private final UUID guitarId;
    private final int quantity;

    public Order(String name, String address, Customer customer, String phoneNum, String paymentMethod, UUID guitarId, int quantity) {
        this.orderId = UUID.randomUUID();
        this.name = name;
        this.address = address;
        this.customer = customer;
        this.phoneNum = phoneNum;
        this.paymentMethod = paymentMethod;
        this.guitarId = guitarId;
        this.quantity = quantity;
    }
}
