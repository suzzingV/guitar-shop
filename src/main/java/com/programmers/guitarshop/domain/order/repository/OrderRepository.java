package com.programmers.guitarshop.domain.order.repository;

import com.programmers.guitarshop.domain.order.entity.Order;

public interface OrderRepository {
    public Order create(Order order);
}
