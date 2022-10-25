package com.rh.stagiaire.Repositories;

import com.rh.stagiaire.Entities.Stagiaire;
import org.springframework.data.jpa.repository.JpaRepository;


public interface StagiaireRepository extends JpaRepository<Stagiaire,Long> {

    Stagiaire findStagiaireById(Long id);
    Stagiaire findStagiaireByUserId(Long id);
}
