package com.programmers.guitarshop.repository;

import com.programmers.guitarshop.domain.Guitar;
import com.programmers.guitarshop.domain.Order;
import com.programmers.guitarshop.exception.CreateException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

import static com.programmers.guitarshop.message.QueryMessage.CREATE_ORDER;

@Repository
public class OrderRepositoryImpl implements OrderRepository {
    private final NamedParameterJdbcTemplate template;

    public OrderRepositoryImpl(NamedParameterJdbcTemplate template) {
        this.template = template;
    }

    @Override
    public Order create(Order order) {
        int update = template.update(CREATE_ORDER.getMessage(), toParamMap(order));
        if(update != 1) {
            throw new CreateException();
        }
        return order;
    }

    private Map<String, Object> toParamMap(Order order) {
        HashMap<String, Object> paramMap = new HashMap<>();

        paramMap.put("orderId", order.getOrderId().toString().getBytes());
        paramMap.put("customerId", order.getCustomer().customerId());
        paramMap.put("name", order.getName());
        paramMap.put("address", order.getAddress());
        paramMap.put("phoneNum", order.getPhoneNum());
        paramMap.put("paymentMethod", order.getPaymentMethod());
        paramMap.put("guitarId", order.getGuitarId().toString().getBytes());
        paramMap.put("quantity", order.getQuantity());

        return paramMap;
    }
}
