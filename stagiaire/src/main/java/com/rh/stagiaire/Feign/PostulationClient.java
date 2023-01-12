package com.rh.stagiaire.Feign;

import com.rh.stagiaire.Model.OffreStage;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "OFFRE-STAGE-SERVICE")
public interface PostulationClient {
    @GetMapping(path = "/offreStage/{id}")
    OffreStage getOffreById(@PathVariable Long id);
}
