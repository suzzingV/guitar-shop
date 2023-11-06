package com.programmers.guitarshop.repository;

import com.programmers.guitarshop.domain.Guitar;
import com.programmers.guitarshop.exception.CreateException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static com.programmers.guitarshop.message.QueryMessage.*;
import static com.programmers.guitarshop.utils.Utils.toUUID;

public class GuitarJdbcRepositoryImpl implements GuitarRepository {
    private final NamedParameterJdbcTemplate template;

    public GuitarJdbcRepositoryImpl(NamedParameterJdbcTemplate template) {
        this.template = template;
    }

    @Override
    public Guitar create(Guitar guitar) {
        int update = template.update(CREATE_GUITAR.getMessage(), toParamMap(guitar));
        if(update != 1) {
            throw new CreateException();
        }
        return null;
    }

    @Override
    public List<Guitar> findAll() {
        return template.query(FIND_ALL_GUITAR.getMessage(), guitarRowmapper);
    }

    @Override
    public List<Guitar> findByCompany(String company) {
        return template.query(FIND_BY_COMPANY_GUITAR.getMessage(),
                new MapSqlParameterSource("company", company),
                guitarRowmapper);
    }

    @Override
    public List<Guitar> findBySale() {
        return template.query(FIND_BY_SALE.getMessage(), guitarRowmapper);
    }

    @Override
    public Guitar update(Guitar guitar) {
        template.update(UPDATE_GUITAR.getMessage(),
                toParamMap(guitar));
        return guitar;
    }

    @Override
    public void delete(UUID guitarId) {
        template.update(DELETE_GUITAR.getMessage(), new MapSqlParameterSource("guitarId", guitarId));
    }

    private static final RowMapper<Guitar> guitarRowmapper = (rs, i) -> {
        return new Guitar(toUUID(rs.getBytes("guitar_id")),
                rs.getString("name"),
                rs.getString("company"),
                rs.getString("country"),
                rs.getDate("manufacture_date").toLocalDate(),
                rs.getLong("price"),
                rs.getLong("price_of_sale"),
                rs.getString("description"));
    };

    private Map<String, Object> toParamMap(Guitar guitar) {
        HashMap<String, Object> paramMap = new HashMap<>();

        paramMap.put("guitarId", guitar.getGuitarId());
        paramMap.put("name", guitar.getName());
        paramMap.put("company", guitar.getCompany());
        paramMap.put("country", guitar.getCountry());
        paramMap.put("manufactureDate", java.sql.Date.valueOf(guitar.getManufactureDate()));
        paramMap.put("price", guitar.getPrice());
        paramMap.put("priceOfSale", guitar.getPriceOfSale());
        paramMap.put("description", guitar.getDescription());

        return paramMap;
    }
}