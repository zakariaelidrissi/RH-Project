package com.example.employerservice.feign;

import com.example.employerservice.confgSecFiegn.ClientConfiguration;
import com.example.employerservice.models.DemandeAbsence;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ABSENCE-SERVICE", configuration = {ClientConfiguration.class})
public interface AbsenceRestClient {
    @PostMapping(path = "/demandes")
    void demandeAbsence(@RequestBody DemandeAbsence demandeAbsence);
}
