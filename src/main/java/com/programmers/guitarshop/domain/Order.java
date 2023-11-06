package com.programmers.guitarshop.domain;

import lombok.Getter;

import java.util.List;
import java.util.UUID;

@Getter
public class Order {
    private final UUID order_id;
    private final Customer customer;
    private final String address;
    private final List<Guitar> guitars;

    public Order(Customer customer, String address, List<Guitar> guitars) {
        this.order_id = UUID.randomUUID();
        this.customer = customer;
        this.address = address;
        this.guitars = guitars;
    }
}
