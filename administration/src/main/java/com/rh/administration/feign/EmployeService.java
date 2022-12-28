package com.rh.administration.feign;

import com.rh.administration.entities.Employe;
import com.rh.administration.entities.Stagiaire;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("GESTION-EMPLOYE-SERVICE")
public interface EmployeService {
    @GetMapping("/employes/userId/{id}")
    Employe getByUserId(@PathVariable(name="id") Long id);
}
