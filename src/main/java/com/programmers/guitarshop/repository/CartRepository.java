package com.programmers.guitarshop.repository;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface CartRepository {
    public UUID add(UUID guitar_id);
    public Map<UUID, Integer> findAll();
    public void deleteAll();

    public long increaseQuantity(UUID guitarId);

    public long decreaseQuantity(UUID guitarId);

    public void delete(UUID guitarId);
}
