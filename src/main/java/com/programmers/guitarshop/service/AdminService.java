package com.programmers.guitarshop.service;

import com.programmers.guitarshop.domain.Admin;
import com.programmers.guitarshop.repository.AdminRepository;
import com.programmers.guitarshop.repository.GuitarRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.programmers.guitarshop.dto.AdminRequest.*;

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
