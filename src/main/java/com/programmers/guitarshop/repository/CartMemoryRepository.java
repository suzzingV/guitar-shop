package com.programmers.guitarshop.repository;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Repository
public class CartMemoryRepository implements CartRepository {

    private final List<UUID> cart = new ArrayList<>();

    @Override
    public UUID add(UUID guitar_id) {
        cart.add(guitar_id);
        return guitar_id;
    }

    @Override
    public void deleteAll() {
        cart.clear();
    }
}
