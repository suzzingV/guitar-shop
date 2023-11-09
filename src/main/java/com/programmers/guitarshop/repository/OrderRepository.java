package com.programmers.guitarshop.repository;

import com.programmers.guitarshop.domain.Order;

public interface OrderRepository {
    public Order create(Order order);
}
