package com.rh.offre_stage.Repositories;


import com.rh.offre_stage.Entities.Postulation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostulationRepository extends JpaRepository<Postulation,Long> {
     Postulation findPostulationById(Long id);
}
