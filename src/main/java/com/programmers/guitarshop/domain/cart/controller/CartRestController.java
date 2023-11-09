package com.programmers.guitarshop.domain.cart.controller;

import com.programmers.guitarshop.domain.cart.service.CartService;
import com.programmers.guitarshop.domain.guitar.dto.GuitarResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/v1/cart")
public class CartRestController {

    private final CartService service;

    public CartRestController(CartService service) {
        this.service = service;
    }

    @PostMapping("/{guitar_id}")
    public ResponseEntity<String> addToCart(@PathVariable UUID guitar_id) {
        service.add(guitar_id);
        String message = "장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?";
        return ResponseEntity.ok(message);
    }

    @GetMapping
    public ResponseEntity<List<GuitarResponse.GuitarDetailResponse>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @PutMapping("/increase/{guitarId}")
    public ResponseEntity<Long> increaseQuantity(@PathVariable UUID guitarId) {
        long response = service.increaseQuantity(guitarId);
        log.info(String.valueOf(response));
        return ResponseEntity.ok(response);
    }

    @PutMapping("/decrease/{guitarId}")
    public ResponseEntity<Long> decreaseQuantity(@PathVariable UUID guitarId) {
        long response = service.decreaseQuantity(guitarId);
        log.info(String.valueOf(response));
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{guitarId}")
    public void deleteCart(@PathVariable UUID guitarId) {
        service.delete(guitarId);
    }

    @DeleteMapping
    public void deleteAll() {
        service.deleteAll();
    }
}
