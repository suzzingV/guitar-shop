package com.programmers.guitarshop.domain;

import java.util.UUID;

public class ExtraProduct {
    private final UUID product_id;
    private final long price;

    public ExtraProduct(long price) {
        this.product_id = UUID.randomUUID();
        this.price = price;
    }
}
