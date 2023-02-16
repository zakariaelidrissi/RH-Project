package com.rh.offre_stage.Repositories;


import com.rh.offre_stage.Entities.Postulation;
import com.rh.offre_stage.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

//@RepositoryRestResource
public interface PostulationRepository extends JpaRepository<Postulation,Long> {
     Postulation findPostulationById(Long id);
     Postulation findPostulationByUserId(Long userId);
}
