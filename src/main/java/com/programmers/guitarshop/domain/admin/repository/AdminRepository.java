package com.programmers.guitarshop.domain.admin.repository;

import com.programmers.guitarshop.domain.admin.entity.Admin;

import java.util.Optional;

public interface AdminRepository {
    public Optional<Admin> findById(String adminId);
}
