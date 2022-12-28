package com.rh.administration.feign;

import com.rh.administration.entities.Stagiaire;
import com.rh.administration.entities.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("STAGIAIRE-SERVICE")
public interface StagiaireService {
    @GetMapping("/stagiaires/user/{id}")
    Stagiaire getByUserId(@PathVariable(name="id") Long id);
}
