package com.example.formationservice.feign;

import com.example.formationservice.confgSecFiegn.ClientConfiguration;
import com.example.formationservice.models.Employe;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "GESTION-EMPLOYE-SERVICE", configuration = {ClientConfiguration.class})
public interface EmployeRestClient {

    @GetMapping(path = "/employes/{id}")
    Employe getEmployeById(@PathVariable Long id);
}
