package com.example.absenceservice.repositories;

import com.example.absenceservice.entities.Demande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface DemandeRepository extends JpaRepository<Demande,Long> {
}
