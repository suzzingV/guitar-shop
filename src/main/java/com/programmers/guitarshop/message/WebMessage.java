package com.programmers.guitarshop.message;

import lombok.Getter;

@Getter
public enum WebMessage {
    CREATE_EXCEPTION("등록에 실패했습니다.");

    String message;

    WebMessage(String message) {
        this.message = message;
    }
}
