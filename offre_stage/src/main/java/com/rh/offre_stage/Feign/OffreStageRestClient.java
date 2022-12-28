package com.rh.offre_stage.Feign;

import com.rh.offre_stage.Entities.OffreStage;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("OFFRE_STAGE-SERVICE")
public interface OffreStageRestClient {
    @GetMapping(path = "offres_stage/{id}")
    OffreStage getOffreStageById(@PathVariable Long id);
}
