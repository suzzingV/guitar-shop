package com.programmers.guitarshop.repository;

import com.programmers.guitarshop.domain.Admin;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.naming.NamingEnumeration;

import java.util.Optional;

import static com.programmers.guitarshop.message.QueryMessage.FIND_BY_ID_ADMIN;

@Repository
public class AdminJdbcRepository implements AdminRepository {
    private final NamedParameterJdbcTemplate template;

    public AdminJdbcRepository(NamedParameterJdbcTemplate template) {
        this.template = template;
    }

    @Override
    public Optional<Admin> findById(String adminId) {
        try {
            return Optional.ofNullable(template.queryForObject(FIND_BY_ID_ADMIN.getMessage(), new MapSqlParameterSource("id", adminId), adminRowmapper));
        } catch(EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    private static final RowMapper<Admin> adminRowmapper = (rs, i) -> {
        return new Admin(rs.getString("id"),
                rs.getString("password"));
    };
}
