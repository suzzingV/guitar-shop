package com.programmers.guitarshop.dto;

import com.programmers.guitarshop.domain.Guitar;
import lombok.Builder;

import java.time.LocalDate;
import java.util.UUID;

public class ResponseGuitar {
    public record GuitarDetailResponse(UUID guitarId, String name, String company, String country, LocalDate manufactureDate, long price, long priceOfSale, String description, String image) {
        @Builder
        public GuitarDetailResponse {
        }
    }

    public static GuitarDetailResponse toGuitarDetailResponse(Guitar guitar) {
        return GuitarDetailResponse.builder()
                .guitarId(guitar.getGuitarId())
                .name(guitar.getName())
                .company(guitar.getCompany())
                .country(guitar.getCountry())
                .manufactureDate(guitar.getManufactureDate())
                .price(guitar.getPrice())
                .priceOfSale(guitar.getPriceOfSale())
                .description(guitar.getDescription())
                .image(guitar.getImage())
                .build();
    }
}
