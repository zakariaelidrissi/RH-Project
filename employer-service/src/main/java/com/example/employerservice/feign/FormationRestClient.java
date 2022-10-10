package com.example.employerservice.feign;

import com.example.employerservice.models.DemandeFormation;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "FORMATION-SERVICE")
public interface FormationRestClient {

    @PostMapping(path = "/addDemande")
    void demandeFormation(@RequestBody DemandeFormation demandeFormation);
}
