package com.example.absenceservice.repositories;

import com.example.absenceservice.entities.EmployeAbsence;
import com.example.absenceservice.entities.StagiaireAbsence;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface StgAbsRepository extends JpaRepository<StagiaireAbsence, Long> {

    StagiaireAbsence findStagiaireAbsenceById(Long id);
    List<StagiaireAbsence> findStagiaireAbsenceByDateAbs(Date date);
}
