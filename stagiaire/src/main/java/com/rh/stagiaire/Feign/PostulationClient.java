package com.rh.stagiaire.Feign;

import com.rh.stagiaire.Model.OffreStage;
import com.rh.stagiaire.Model.Postulation;
import com.rh.stagiaire.Model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "OFFRE-STAGE-SERVICE")
public interface PostulationClient {
    @GetMapping(path = "/offreStage/{id}")
    OffreStage getOffreById(@PathVariable Long id);

    @GetMapping(path = "/postulations/{id}")
    public Postulation getPostulationByUserId(@PathVariable Long userId);


}
