package com.programmers.guitarshop.repository;

import com.programmers.guitarshop.domain.Customer;
import org.springframework.stereotype.Repository;

public interface CustomerRepository {
    public Customer create(Customer customer);
}
