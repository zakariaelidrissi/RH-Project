package com.example.formationservice.repositories;

import com.example.formationservice.entities.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanRepository extends JpaRepository<Plan,Long> {
    Plan findPlanById(Long id);
}
