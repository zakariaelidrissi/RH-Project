package com.rh.offre_stage.Repositories;

import com.rh.offre_stage.Entities.OffreStage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface OffreStageRepository extends JpaRepository<OffreStage,Long> {
}