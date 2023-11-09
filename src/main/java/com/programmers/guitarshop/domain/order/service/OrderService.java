package com.programmers.guitarshop.domain.order.service;

import com.programmers.guitarshop.domain.cart.repository.CartRepository;
import com.programmers.guitarshop.domain.customer.entity.Customer;
import com.programmers.guitarshop.domain.customer.repository.CustomerRepository;
import com.programmers.guitarshop.domain.order.entity.Order;
import com.programmers.guitarshop.domain.order.repository.OrderRepository;
import com.programmers.guitarshop.exception.EmptyCartException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static com.programmers.guitarshop.domain.order.dto.OrderRequest.OrderDetailRequest;
import static com.programmers.guitarshop.domain.order.dto.OrderResponse.OrderDetailResponse;
import static com.programmers.guitarshop.domain.order.dto.OrderResponse.toOrderDetailResponse;

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
        if (cart.isEmpty()) throw new EmptyCartException("카트에 담긴 상품이 없습니다.");
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

    public OrderDetailResponse createOrder(UUID guitarId, OrderDetailRequest request) {
        Customer customer = new Customer(request.customerId(), request.password());
        customerRepository.create(customer);

        Order order = new Order(request.name(), request.address(), customer, request.phoneNum(), request.paymentMethod(), guitarId, 1);
        return toOrderDetailResponse(orderRepository.create(order));
    }
}
