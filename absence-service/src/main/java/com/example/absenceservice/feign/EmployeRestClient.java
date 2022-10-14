package com.example.absenceservice.feign;

import com.example.absenceservice.model.Employe;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "GESTION-EMPLOYE-SERVICE")
public interface EmployeRestClient {

    @GetMapping(path = "/employes/{id}")
    Employe getEmployeById(@PathVariable Long id);
}
