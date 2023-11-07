package com.programmers.guitarshop.controller;

import com.programmers.guitarshop.service.CompanyService;
import com.programmers.guitarshop.service.GuitarService;
import com.programmers.guitarshop.utils.Utils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static com.programmers.guitarshop.dto.RequestGuitar.*;
import static com.programmers.guitarshop.dto.ResponseGuitar.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/guitars")
public class GuitarRestController {
    private final GuitarService guitarService;
    private final CompanyService companyService;

    public GuitarRestController(GuitarService guitarService, CompanyService companyService) {
        this.guitarService = guitarService;
        this.companyService = companyService;
    }

    @GetMapping
    public Map<String, Object> guitars() {
        List<GuitarDetailResponse> guitarList = guitarService.findAll();
        List<String> companyList = companyService.findAll();

        Map<String, Object> response = new HashMap<>();
        response.put("byCompany", guitarList);
        response.put("tabList", companyList);
        return response;
    }

    @GetMapping("/{guitarId}")
    public GuitarDetailResponse findById(@PathVariable UUID guitarId) {
        return guitarService.findById(guitarId);
    }

    @GetMapping("/{company}/byCompany")
    public Map<String, Object> findByCompany(@PathVariable String company) {
        List<GuitarDetailResponse> list = guitarService.findByCompany(company);
        List<String> companyList = companyService.findAll();

        Map<String, Object> response = new HashMap<>();
        response.put("byCompany", list);
        response.put("tabList", companyList);
        return response;
    }

    @GetMapping("/bySale")
    public ResponseEntity<List<GuitarDetailResponse>> findBySale() {
        return new ResponseEntity<>(guitarService.findBySale(), HttpStatus.OK);
    }

    @PostMapping("/guitar")
    public ResponseEntity<GuitarDetailResponse> createGuitar(@RequestBody CreateGuitarRequest request) {
        GuitarDetailResponse response = guitarService.create(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/guitar/{guitarId}")
    public void deleteGuitar(@PathVariable UUID guitarId) {
        guitarService.delete(guitarId);
    }

    @PutMapping("/guitar")
    public ResponseEntity<GuitarDetailResponse> updateGuitar(@RequestBody GuitarDetailRequest request) {
        GuitarDetailResponse update = guitarService.update(request);
        return new ResponseEntity<>(update, HttpStatus.OK);
    }
}
