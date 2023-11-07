package com.programmers.guitarshop.repository;

import com.programmers.guitarshop.domain.Guitar;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.programmers.guitarshop.message.QueryMessage.*;
import static com.programmers.guitarshop.utils.Utils.toUUID;


@Repository
public class CompanyJdbcRepository implements CompanyRepository {

    private final NamedParameterJdbcTemplate template;

    public CompanyJdbcRepository(NamedParameterJdbcTemplate template) {
        this.template = template;
    }
    @Override
    public List<String> findAll() {
        return template.query(FIND_ALL_COMPANY.getMessage(), companyRowmapper);
    }

    @Override
    public String create(String company) {
        template.update(CREATE_COMPANY.getMessage(),
                toParamMap(company));
        return company;
    }

    private static final RowMapper<String> companyRowmapper = (rs, i) -> {
        return rs.getString("name");
    };

    private Map<String, Object> toParamMap(String company) {
        HashMap<String, Object> paramMap = new HashMap<>();
        paramMap.put("name", company);
        return paramMap;
    }
}
