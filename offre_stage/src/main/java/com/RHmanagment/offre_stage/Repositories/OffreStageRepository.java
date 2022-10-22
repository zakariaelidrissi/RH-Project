package com.RHmanagment.offre_stage.Repositories;

import com.RHmanagment.offre_stage.Entities.OffreStage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface OffreStageRepository extends JpaRepository<OffreStage,Long> {

    OffreStage findOffreStageById(Long id);
    OffreStage findOffreStageByUserId(Long id);
    OffreStage findOffreStagePostuleByUserId(Long id);
}