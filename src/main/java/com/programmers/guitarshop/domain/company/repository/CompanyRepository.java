package com.programmers.guitarshop.domain.company.repository;

import java.util.List;

public interface CompanyRepository {
    public List<String> findAll();

    public String create(String company);
}
