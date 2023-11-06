package com.programmers.guitarshop.exception;

import static com.programmers.guitarshop.message.WebMessage.CREATE_EXCEPTION;

public class CreateException extends RuntimeException {
    public CreateException() {
        super(CREATE_EXCEPTION.getMessage());
    }
}
