package com.programmers.guitarshop.domain.guitar.repository;

import com.programmers.guitarshop.domain.guitar.entity.Guitar;

import java.util.List;
import java.util.UUID;

public interface GuitarRepository {
    public Guitar create(Guitar guitar);

    public List<Guitar> findAll();

    public List<Guitar> findByCompany(String company);

    public List<Guitar> findBySale();

    public Guitar update(Guitar guitar);

    public void delete(UUID guitarId);

    public Guitar findById(UUID id);

    public long increaseQuantity();
}
