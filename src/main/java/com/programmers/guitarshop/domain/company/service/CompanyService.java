package com.programmers.guitarshop.domain.company.service;

import com.programmers.guitarshop.domain.company.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {
    private final CompanyRepository repository;

    public CompanyService(CompanyRepository repository) {
        this.repository = repository;
    }

    public List<String> findAll() {
        return repository.findAll();
    }
}
