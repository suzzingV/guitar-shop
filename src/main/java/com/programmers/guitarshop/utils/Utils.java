package com.programmers.guitarshop.utils;

import java.nio.ByteBuffer;
import java.util.UUID;

public class Utils {

    public static UUID toUUID(byte[] bytes) {
        ByteBuffer byteBuffer = ByteBuffer.wrap(bytes);
        return new UUID(byteBuffer.getLong(), byteBuffer.getLong());
    }
}
