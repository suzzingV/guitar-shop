package com.programmers.guitarshop.service;

import com.programmers.guitarshop.dto.ResponseGuitar;
import com.programmers.guitarshop.exception.CartQuantityException;
import com.programmers.guitarshop.repository.CartRepository;
import com.programmers.guitarshop.repository.GuitarRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static com.programmers.guitarshop.dto.ResponseGuitar.*;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final GuitarRepository guitarRepository;

    public CartService(CartRepository cartRepository, GuitarRepository guitarRepository) {
        this.cartRepository = cartRepository;
        this.guitarRepository = guitarRepository;
    }

    public UUID add(UUID guitar_id) {
        cartRepository.add(guitar_id);
        return guitar_id;
    }
    
    public List<GuitarDetailResponse> findAll() {
        Map<UUID, Integer> cart = cartRepository.findAll();
        List<GuitarDetailResponse> responses = new ArrayList<>();
        cart.forEach((id, quantity) -> {
            responses.add(toGuitarDetailResponse(guitarRepository.findById(id), quantity));
        });
        return responses;
    }

    public void deleteAll() {
        cartRepository.deleteAll();
    }

    public long increaseQuantity(UUID guitarId) {
        return cartRepository.increaseQuantity(guitarId);
    }

    public long decreaseQuantity(UUID guitarId) {
        try {
            return cartRepository.decreaseQuantity(guitarId);
        } catch (CartQuantityException e) {
            return 1;
        }
    }

    public void delete(UUID guitarId) {
        cartRepository.delete(guitarId);
    }
}
