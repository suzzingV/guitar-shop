package com.programmers.guitarshop.dto;

import lombok.Builder;

import java.time.LocalDate;
import java.util.UUID;

public class RequestGuitar {

    public record GuitarDetailRequest(UUID guitarId, String name, String company, String country, LocalDate manufactureDate, long price, long priceOfSale, String description, String image, long quantity) {
        @Builder
        public GuitarDetailRequest {
        }
    }

    public record CreateGuitarRequest(String name, String company, String country, LocalDate manufactureDate, long price, long priceOfSale, String description, String image) {
        @Builder
        public CreateGuitarRequest {
        }
    }
}
