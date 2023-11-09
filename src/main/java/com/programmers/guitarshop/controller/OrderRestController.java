package com.programmers.guitarshop.controller;

import com.programmers.guitarshop.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping
    public ResponseEntity<List<OrderDetailResponse>> create(@RequestBody OrderDetailRequest request) {
        log.info("request: " + request);
        List<OrderDetailResponse> responses = orderService.createCartOrder(request);

        log.info("response : " + responses);
        return ResponseEntity.ok(responses);
    }
}
