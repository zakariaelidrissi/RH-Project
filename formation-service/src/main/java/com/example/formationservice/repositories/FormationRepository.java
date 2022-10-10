package com.example.formationservice.repositories;

import com.example.formationservice.entities.Formation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

public interface FormationRepository extends JpaRepository<Formation,Long> {

    Formation findByName(String formationName);
    Formation findFormationById(Long id);
}
