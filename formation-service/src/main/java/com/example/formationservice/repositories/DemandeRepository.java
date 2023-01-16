package com.example.formationservice.repositories;

import com.example.formationservice.entities.Demande;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DemandeRepository extends JpaRepository<Demande,Long> {

    Demande findDemandeById(Long id);
    List<Demande> findAllDemandeByEmployeId(Long id);
    List<Demande> findAllDemandeByFormationId(Long id);

}
