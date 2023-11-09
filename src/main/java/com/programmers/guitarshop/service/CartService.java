package com.programmers.guitarshop.service;

import com.programmers.guitarshop.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CartService {

    private final CartRepository repository;

    public CartService(CartRepository repository) {
        this.repository = repository;
    }

    public UUID add(UUID guitar_id) {
        repository.add(guitar_id);
        return guitar_id;
    }

    public void deleteAll() {
        repository.deleteAll();
    }
}
