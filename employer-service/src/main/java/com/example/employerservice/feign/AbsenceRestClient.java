package com.example.employerservice.feign;

import com.example.employerservice.confgSecFiegn.ClientConfiguration;
import com.example.employerservice.models.Absence;
import com.example.employerservice.models.DemandeAbsence;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "ABSENCE-SERVICE", configuration = {ClientConfiguration.class})
public interface AbsenceRestClient {

    @PostMapping(path = "/demandes")
    void demandeAbsence(@RequestBody DemandeAbsence demandeAbsence);

    @GetMapping(path = "/demandes/byEmpId/{idEmp}")
    List<Absence> getAllAbs(@PathVariable Long idEmp);
}
