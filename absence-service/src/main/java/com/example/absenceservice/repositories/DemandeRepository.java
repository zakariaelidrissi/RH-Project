package com.example.absenceservice.repositories;

import com.example.absenceservice.entities.DemandeAbsence;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DemandeRepository extends JpaRepository<DemandeAbsence,Long> {

    DemandeAbsence findDemandeById(Long id);
    List<DemandeAbsence> findAllByEmployeId(Long id);
}
