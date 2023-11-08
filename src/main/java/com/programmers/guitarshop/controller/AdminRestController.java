package com.programmers.guitarshop.controller;

import com.programmers.guitarshop.dto.ResponseGuitar;
import com.programmers.guitarshop.service.AdminService;
import com.programmers.guitarshop.service.CompanyService;
import com.programmers.guitarshop.service.GuitarService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.programmers.guitarshop.dto.AdminRequest.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/admin")
public class AdminRestController {
    private final AdminService adminService;
    private final GuitarService guitarService;
    private final CompanyService companyService;

    public AdminRestController(AdminService adminService, GuitarService guitarService, CompanyService companyService) {
        this.adminService = adminService;
        this.guitarService = guitarService;
        this.companyService = companyService;
    }

    @PostMapping("/login")
    public boolean loginAdmin(@RequestBody AdminDetailRequest request) {
        log.info("id password: " + request.id() + " " + request.password());
        return adminService.isSuccess(request);
    }

    @GetMapping
    public Map<String, Object> adminGuitars() {
        List<ResponseGuitar.GuitarDetailResponse> guitarList = guitarService.findAll();
        List<String> companyList = companyService.findAll();

        Map<String, Object> response = new HashMap<>();
        response.put("byCompany", guitarList);
        response.put("tabList", companyList);
        log.info("into controller");
        return response;
    }
}
