package com.programmers.guitarshop.domain.customer.repository;

import com.programmers.guitarshop.domain.customer.entity.Customer;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

import static com.programmers.guitarshop.message.QueryMessage.CREATE_CUSTOMER;

@Repository
public class CustomerJdbcRepository implements CustomerRepository {

    private final NamedParameterJdbcTemplate template;

    public CustomerJdbcRepository(NamedParameterJdbcTemplate template) {
        this.template = template;
    }

    @Override
    public Customer create(Customer customer) {
        int update = template.update(CREATE_CUSTOMER.getMessage(), toParamMap(customer));
        return customer;
    }

    private Map<String, Object> toParamMap(Customer customer) {
        HashMap<String, Object> paramMap = new HashMap<>();

        paramMap.put("customerId", customer.customerId());
        paramMap.put("password", customer.password());

        return paramMap;
    }
}
