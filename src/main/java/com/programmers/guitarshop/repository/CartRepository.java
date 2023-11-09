package com.programmers.guitarshop.repository;

import java.util.UUID;

public interface CartRepository {
    public UUID add(UUID guitar_id);
    public void deleteAll();
}
