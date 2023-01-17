package com.example.absenceservice.repositories;

import com.example.absenceservice.entities.DemandeAbsence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DemandeRepository extends JpaRepository<DemandeAbsence,Long> {

    DemandeAbsence findDemandeById(Long id);
    List<DemandeAbsence> findAllByEmployeId(Long id);

    @Query(
            value = "select justificatif from demande_absence where id = ?1",
            nativeQuery = true
    )
    Byte[] loadFile(Long id);
}
