package com.programmers.guitarshop.controller;

import com.programmers.guitarshop.service.AdminService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import static com.programmers.guitarshop.dto.AdminRequest.*;

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
