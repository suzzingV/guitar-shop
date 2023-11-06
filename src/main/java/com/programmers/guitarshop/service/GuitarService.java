package com.programmers.guitarshop.service;

import com.programmers.guitarshop.domain.Guitar;
import com.programmers.guitarshop.dto.ResponseGuitar;
import com.programmers.guitarshop.repository.GuitarRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuitarService {
    private final GuitarRepository repository;

    public GuitarService(GuitarRepository repository) {
        this.repository = repository;
    }

    public List<ResponseGuitar.GuitarDetailResponse> findAll() {
        List<Guitar> guitars = repository.findAll();
        return getGuitarDetailResponses(guitars);
    }

    private List<ResponseGuitar.GuitarDetailResponse> getGuitarDetailResponses(List<Guitar> guitars) {
        return guitars.stream()
                .map(guitar -> {
                    ResponseGuitar.GuitarDetailResponse.builder()
                            .guitarId(guitar.getGuitarId())
                            .name(guitar.getName())
                            .company(guitar.getCompany())
                            .country(guitar.getCountry())
                            .manufactureDate(guitar.getManufactureDate())
                            .price(guitar.getPrice())
                            .priceOfSale(guitar.getPriceOfSale())
                            .description(guitar.getDescription())
                            .build();
                });
    }
}
