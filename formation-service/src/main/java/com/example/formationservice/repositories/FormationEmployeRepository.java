package com.example.formationservice.repositories;

import com.example.formationservice.entities.Formation_employe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FormationEmployeRepository extends JpaRepository<Formation_employe, Long> {

    Formation_employe findFormation_employeById(Long id);
    List<Formation_employe> findAllFormation_employeByEmployeId(Long id);
    List<Formation_employe> findAllFormation_employeByFormationId(Long id);
    void deleteByFormationIdAndEmployeId(Long idFrom,Long idEmp);

}
