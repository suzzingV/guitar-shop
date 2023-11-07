package com.programmers.guitarshop.repository;

import java.util.List;

public interface CompanyRepository {
    public List<String> findAll();
    public String create(String company);
}
