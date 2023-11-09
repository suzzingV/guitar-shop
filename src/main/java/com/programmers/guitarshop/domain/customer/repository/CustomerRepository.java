package com.programmers.guitarshop.domain.customer.repository;

import com.programmers.guitarshop.domain.customer.entity.Customer;

public interface CustomerRepository {
    public Customer create(Customer customer);
}
