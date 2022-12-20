package com.example.formationservice.repositories;

import com.example.formationservice.entities.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

public interface PlanRepository extends JpaRepository<Plan,Long> {
    Plan findPlanById(Long id);
    Plan findByName(String planName);
}
