package com.programmers.guitarshop.domain.guitar.dto;

import lombok.Builder;

import java.time.LocalDate;
import java.util.UUID;

public class GuitarRequest {

    public record GuitarDetailRequest(UUID guitarId, String name, String company, String country,
                                      LocalDate manufactureDate, long price, long priceOfSale, String description,
                                      String image, long quantity) {
        @Builder
        public GuitarDetailRequest {
        }
    }

    public record CreateGuitarRequest(String name, String company, String country, LocalDate manufactureDate,
                                      long price, long priceOfSale, String description, String image) {
        @Builder
        public CreateGuitarRequest {
        }
    }
}
