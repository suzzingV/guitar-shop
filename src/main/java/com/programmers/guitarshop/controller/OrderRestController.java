package com.programmers.guitarshop.controller;

import com.programmers.guitarshop.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static com.programmers.guitarshop.dto.OrderRequest.*;
import static com.programmers.guitarshop.dto.OrderResponse.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/order")
public class OrderRestController {

    private final OrderService orderService;

    public OrderRestController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/cart")
    public ResponseEntity<List<OrderDetailResponse>> createCartOrder(@RequestBody OrderDetailRequest request) {
        log.info("request: " + request);
        List<OrderDetailResponse> responses = orderService.createCartOrder(request);

        log.info("response : " + responses);
        return ResponseEntity.ok(responses);
    }

    @PostMapping("/{guitarId}")
    public ResponseEntity<OrderDetailResponse> createOrder(@PathVariable UUID guitarId, @RequestBody OrderDetailRequest request) {
        log.info("여기?");
        OrderDetailResponse responses = orderService.createOrder(guitarId, request);

        log.info("response : " + responses);
        return ResponseEntity.ok(responses);
    }
}
