package com.programmers.guitarshop.message;

import lombok.Getter;

@Getter
public enum QueryMessage {
    CREATE_GUITAR("insert into guitars (guitar_id, name, company, country, manufacture_date, price, price_of_sale, description)"
            + "values(UUID_TO_BIN(:guitarId), :name, :company, :country, :manufactureDate, :price, :priceOfSale, :description)"),
    FIND_ALL_GUITAR("select * from guitars"),
    FIND_BY_COMPANY_GUITAR("select * from guitars where company = :company"),
    FIND_BY_SALE("select * from guitars where price_of_sale > 0"),
    UPDATE_GUITAR("update guitars set name = :name, company = :company, country = :country, manufacture_date = :manufactureDate, price = :price, price_of_sale = :priceOfSale, description = :description where guitar_id = UUID_TO_BIN(:guitarId);"),
    DELETE_GUITAR("delete from guitars where guitar_id = UUID_TO_BIN(:guitarId)");

    String message;

    QueryMessage(String message) {
        this.message = message;
    }
}
