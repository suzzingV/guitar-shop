package com.programmers.guitarshop.repository;

import com.programmers.guitarshop.domain.Admin;

import java.util.Optional;

public interface AdminRepository {
    public Optional<Admin> findById(String adminId);
}
