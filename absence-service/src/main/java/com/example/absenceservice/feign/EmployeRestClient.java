package com.example.absenceservice.feign;

import com.example.absenceservice.confgSecFiegn.ClientConfiguration;
import com.example.absenceservice.model.Employe;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "GESTION-EMPLOYE-SERVICE", configuration = {ClientConfiguration.class})
public interface EmployeRestClient {

    @GetMapping(path = "/employes/{id}")
    Employe getEmployeById(@PathVariable Long id);

    @GetMapping(path = "/employes")
    List<Employe> getAllEmp();
}
