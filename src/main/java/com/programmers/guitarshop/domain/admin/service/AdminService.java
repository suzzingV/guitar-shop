package com.programmers.guitarshop.domain.admin.service;

import com.programmers.guitarshop.domain.admin.entity.Admin;
import com.programmers.guitarshop.domain.admin.repository.AdminRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.programmers.guitarshop.domain.admin.dto.AdminRequest.AdminDetailRequest;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public boolean isSuccess(AdminDetailRequest request) {
        Optional<Admin> byId = adminRepository.findById(request.id());
        return byId.filter(admin -> request.password().equals(admin.password())).isPresent();
    }
}
