package com.example.absenceservice.repositories;

import com.example.absenceservice.entities.EmployeAbsence;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface EmpAbsRepository extends JpaRepository<EmployeAbsence,Long> {

    EmployeAbsence findEmployeAbsenceById(Long id);
    List<EmployeAbsence> findAllByDateAbs(Date date);
}
