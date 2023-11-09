package com.programmers.guitarshop.domain.cart.repository;

import com.programmers.guitarshop.exception.CartQuantityException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Repository
public class CartMemoryRepository implements CartRepository {

    private final Map<UUID, Integer> cart = new HashMap<>();

    @Override
    public UUID add(UUID guitar_id) {
        if (cart.containsKey(guitar_id)) {
            cart.put(guitar_id, cart.get(guitar_id) + 1);
            log.info("카트에 이미 존재하는 상품 : " + cart.get(guitar_id));
        } else {
            cart.put(guitar_id, 1);
        }
        return guitar_id;
    }

    public Map<UUID, Integer> findAll() {
        return cart;
    }

    @Override
    public void deleteAll() {
        cart.clear();
    }

    @Override
    public long increaseQuantity(UUID guitarId) {
        cart.put(guitarId, cart.get(guitarId) + 1);
        return cart.get(guitarId);
    }

    @Override
    public long decreaseQuantity(UUID guitarId) {
        if (cart.get(guitarId) == 1) {
            throw new CartQuantityException("수량은 1 이상이어야 합니다.");
        }
        cart.put(guitarId, cart.get(guitarId) - 1);
        return cart.get(guitarId);
    }

    @Override
    public void delete(UUID guitarId) {
        cart.remove(guitarId);
    }
}
