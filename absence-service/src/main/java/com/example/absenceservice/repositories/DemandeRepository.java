package com.example.absenceservice.repositories;

import com.example.absenceservice.entities.DemandeAbsence;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DemandeRepository extends JpaRepository<DemandeAbsence,Long> {

    DemandeAbsence findDemandeById(Long id);
}
