package com.example.formationservice.repositories;

import com.example.formationservice.entities.Demande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource
public interface DemandeRepository extends JpaRepository<Demande,Long> {

}
