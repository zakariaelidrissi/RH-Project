package com.example.formationservice.repositories;

import com.example.formationservice.entities.Formation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FormationRepository extends JpaRepository<Formation,Long> {

    Formation findFormationById(Long id);
}
