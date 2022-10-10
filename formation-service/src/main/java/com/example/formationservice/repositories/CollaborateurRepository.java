package com.example.formationservice.repositories;

import com.example.formationservice.entities.Collaborateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

public interface CollaborateurRepository extends JpaRepository<Collaborateur,Long> {

    Collaborateur findCollaborateurById(Long collaborateurId);
    Collaborateur findCollaborateurByEmpolyeID(Long userId);
    //Collaborateur findByCin(String cin);


}
