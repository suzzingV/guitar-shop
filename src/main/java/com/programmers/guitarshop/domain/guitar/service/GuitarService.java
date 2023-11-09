package com.programmers.guitarshop.domain.guitar.service;

import com.programmers.guitarshop.domain.company.repository.CompanyRepository;
import com.programmers.guitarshop.domain.guitar.dto.GuitarResponse;
import com.programmers.guitarshop.domain.guitar.entity.Guitar;
import com.programmers.guitarshop.domain.guitar.repository.GuitarRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import static com.programmers.guitarshop.domain.guitar.dto.GuitarRequest.CreateGuitarRequest;
import static com.programmers.guitarshop.domain.guitar.dto.GuitarRequest.GuitarDetailRequest;
import static com.programmers.guitarshop.domain.guitar.dto.GuitarResponse.GuitarDetailResponse;
import static com.programmers.guitarshop.domain.guitar.dto.GuitarResponse.toGuitarDetailResponse;

@Service
@Slf4j
public class GuitarService {
    private final GuitarRepository repository;
    private final CompanyRepository companyRepository;

    public GuitarService(GuitarRepository repository, CompanyRepository companyRepository) {
        this.repository = repository;
        this.companyRepository = companyRepository;
    }

    public List<GuitarDetailResponse> findAll() {
        List<Guitar> guitars = repository.findAll();
        return getGuitarDetailResponses(guitars);
    }

    private List<GuitarDetailResponse> getGuitarDetailResponses(List<Guitar> guitars) {
        return guitars.stream()
                .map(guitar -> GuitarResponse.toGuitarDetailResponse(guitar, 1)).toList();
    }

    public GuitarDetailResponse create(CreateGuitarRequest request) {
        Guitar guitar = new Guitar(request.name(), request.company(), request.country(), request.manufactureDate(),
                request.price(), request.priceOfSale(), request.description(), request.image());
        log.info("created guitar id : " + guitar.getGuitarId());
        Guitar createdGuitar = repository.create(guitar);
        companyRepository.create(request.company());
        return toGuitarDetailResponse(createdGuitar, 1);
    }

    public void delete(UUID guitarId) {
        repository.delete(guitarId);
    }

    public GuitarDetailResponse update(GuitarDetailRequest request) {
        Guitar guitar = new Guitar(request.guitarId(),
                request.name(),
                request.company(),
                request.country(),
                request.manufactureDate(),
                request.price(),
                request.priceOfSale(),
                request.description(),
                request.image());
        Guitar update = repository.update(guitar);

        return toGuitarDetailResponse(update, 1);
    }

    public List<GuitarDetailResponse> findByCompany(String company) {
        List<Guitar> byCompany = repository.findByCompany(company);
        return getGuitarDetailResponses(byCompany);
    }

    public List<GuitarDetailResponse> findBySale() {
        List<Guitar> bySale = repository.findBySale();
        return getGuitarDetailResponses(bySale);
    }

    public GuitarDetailResponse findById(UUID id) {
        Guitar byId = repository.findById(id);
        return toGuitarDetailResponse(byId, 1);
    }
}
