package com.carservice.CarService.sparePart;

import com.carservice.CarService.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class SparePartService {
    private final SparePartRepository sparePartRepository;

    public List<SparePart> getAllSpareParts() {
        return sparePartRepository.findAll();
    }

    public SparePart getSparePartById(Long sparePartId) {
        return sparePartRepository.findById(sparePartId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "PrSpare Part with id [%s] not found.".formatted(sparePartId)
                ));
    }

    public void updateSparePart(Long sparePartId, SparePart sparePart) {
        SparePart updatedSparePart = sparePartRepository.findById(sparePartId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Spare Part with id [%s] not found.".formatted(sparePartId)
                ));

        updatedSparePart.setName(sparePart.getName());
        updatedSparePart.setPrice(sparePart.getPrice());
        updatedSparePart.setQuantity(sparePart.getQuantity());
        updatedSparePart.setProducer(sparePart.getProducer());
        updatedSparePart.setSparePartState(sparePart.getSparePartState());

        sparePartRepository.save(updatedSparePart);
    }
}
