package com.programmers.guitarshop.domain.admin.controller;

import com.programmers.guitarshop.domain.admin.service.AdminService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.programmers.guitarshop.domain.admin.dto.AdminRequest.AdminDetailRequest;

@Slf4j
@RestController
@RequestMapping("/api/v1/admin")
public class AdminRestController {
    private final AdminService adminService;

    public AdminRestController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/login")
    public boolean loginAdmin(@RequestBody AdminDetailRequest request) {
        log.info("id password: " + request.id() + " " + request.password());
        return adminService.isSuccess(request);
    }
}
