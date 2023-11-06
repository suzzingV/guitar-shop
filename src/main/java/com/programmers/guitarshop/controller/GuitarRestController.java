package com.programmers.guitarshop.controller;

import com.programmers.guitarshop.domain.Guitar;
import com.programmers.guitarshop.dto.ResponseGuitar;
import com.programmers.guitarshop.service.GuitarService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.programmers.guitarshop.dto.ResponseGuitar.*;

@RestController
@RequestMapping("/api/v1/guitars")
public class GuitarRestController {
    private final GuitarService guitarService;

    public GuitarRestController(GuitarService guitarService) {
        this.guitarService = guitarService;
    }

    @GetMapping
    public ResponseEntity<List<GuitarDetailResponse>> guitars() {
        return new ResponseEntity<>(guitarService.findAll(), HttpStatus.OK);
    }
}
