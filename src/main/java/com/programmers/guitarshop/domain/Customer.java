package com.programmers.guitarshop.domain;

import lombok.Getter;

import java.util.UUID;

@Getter
public class Customer {
    private final UUID customer_id;
    private final String name;
    private final String phoneNum;

    public Customer(String name, String phoneNum) {
        this.customer_id = UUID.randomUUID();
        this.name = name;
        this.phoneNum = phoneNum;
    }
}
