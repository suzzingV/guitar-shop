package com.programmers.guitarshop.service;

import com.programmers.guitarshop.domain.Customer;
import com.programmers.guitarshop.domain.Order;
import com.programmers.guitarshop.exception.EmptyCartException;
import com.programmers.guitarshop.repository.CartRepository;
import com.programmers.guitarshop.repository.CustomerRepository;
import com.programmers.guitarshop.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static com.programmers.guitarshop.dto.OrderRequest.*;
import static com.programmers.guitarshop.dto.OrderResponse.*;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final CartRepository cartRepository;

    public OrderService(OrderRepository orderRepository, CustomerRepository customerRepository, CartRepository cartRepository) {
        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
        this.cartRepository = cartRepository;
    }

    @Transactional
    public List<OrderDetailResponse> createCartOrder(OrderDetailRequest request) {
        Map<UUID, Integer> cart = cartRepository.findAll();
        if(cart.isEmpty()) throw new EmptyCartException("카트에 담긴 상품이 없습니다.");
        Customer customer = new Customer(request.customerId(), request.password());
        customerRepository.create(customer);

        List<OrderDetailResponse> responses = new ArrayList<>();
        cart
                .forEach((guitarId, quantity) -> {
                    Order order = new Order(request.name(), request.address(), customer, request.phoneNum(), request.paymentMethod(), guitarId, quantity);
                    orderRepository.create(order);
                    responses.add(toOrderDetailResponse(order));
                });
        return responses;
    }
}
