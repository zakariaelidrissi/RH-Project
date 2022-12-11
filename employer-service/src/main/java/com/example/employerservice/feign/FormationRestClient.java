package com.example.employerservice.feign;

import com.example.employerservice.confgSecFiegn.ClientConfiguration;
import com.example.employerservice.models.DemandeFormationRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "FORMATION-SERVICE", configuration = {ClientConfiguration.class})
public interface FormationRestClient {

    @PostMapping(path = "/addDemande")
    void demandeFormation(@RequestBody DemandeFormationRequest demandeFormation);


}
