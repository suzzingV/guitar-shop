package com.programmers.guitarshop.controller;

import com.programmers.guitarshop.service.CartService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/cart")
public class CartRestController {

    private final CartService service;

    public CartRestController(CartService service) {
        this.service = service;
    }

    @PostMapping("/{guitar_id}")
    public UUID addToCart(@PathVariable UUID guitar_id) {
        service.add(guitar_id);
        return guitar_id;
    }

    @DeleteMapping
    public void deleteAllCart() {
        service.deleteAll();
    }
}
