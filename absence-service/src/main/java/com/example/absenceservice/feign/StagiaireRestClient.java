package com.example.absenceservice.feign;

import com.example.absenceservice.model.Stagiaire;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "STAGIAIRE-SERVICE")
public interface StagiaireRestClient {

    @GetMapping(path = "/stagiaires/{id}")
    Stagiaire getStagiaireById(@PathVariable Long id);

    @GetMapping(path="/stagiaires")
    List<Stagiaire> getAllStg();

}
