package com.example.employerservice.feign;

import com.example.employerservice.models.DemandeAttestationRequest;
import com.example.employerservice.models.DemandeAttestationResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ADMINISTRATION-SERVICE")
public interface AttestationRestClient {

    @PostMapping(path = "/demande-att")
    DemandeAttestationResponse sendDemande(@RequestBody DemandeAttestationRequest demande);

    @GetMapping(path = "/demande-att/{id}")
    DemandeAttestationResponse getAll(@PathVariable Long id);
}
