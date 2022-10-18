package com.RHmanagment.stagiaire.Repositories;

import com.RHmanagment.stagiaire.Entities.Stagiaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

public interface StagiaireRepository extends JpaRepository<Stagiaire,Long> {

    Stagiaire findStagiaireById(Long id);
    Stagiaire findStagiaireByUserId(Long id);
}
