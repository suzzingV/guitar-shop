package com.programmers.guitarshop.dto;

import lombok.Builder;

import java.time.LocalDate;
import java.util.UUID;

public class ResponseGuitar {
    public record GuitarDetailResponse(UUID guitarId, String name, String company, String country, LocalDate manufactureDate, long price, long priceOfSale, String description) {
        @Builder
        public GuitarDetailResponse {
        }
    }
}
