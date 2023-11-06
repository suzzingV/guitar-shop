package com.programmers.guitarshop.domain;

import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
public class Guitar {
    private final UUID guitarId;
    private final String name;
    private final String company;
    private final String country;
    private final LocalDate manufactureDate;
    private final long price;
    private final long priceOfSale;
    private final String description;

    public Guitar(String name, String company, String country, LocalDate manufactureDate, long price, long priceOfSale, String description) {
        this.guitarId = UUID.randomUUID();
        this.name = name;
        this.company = company;
        this.country = country;
        this.manufactureDate = manufactureDate;
        this.price = price;
        this.priceOfSale = priceOfSale;
        this.description = description;
    }

    public Guitar(UUID guitarId, String name, String company, String country, LocalDate manufactureDate, long price, long priceOfSale, String description) {
        this.guitarId = guitarId;
        this.name = name;
        this.company = company;
        this.country = country;
        this.manufactureDate = manufactureDate;
        this.price = price;
        this.priceOfSale = priceOfSale;
        this.description = description;
    }
}
