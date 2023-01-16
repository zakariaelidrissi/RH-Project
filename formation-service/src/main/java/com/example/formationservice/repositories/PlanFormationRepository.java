package com.example.formationservice.repositories;

import com.example.formationservice.entities.Plan_formation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanFormationRepository extends JpaRepository<Plan_formation, Long> {

    Plan_formation findPlan_formationById(Long id);
    List<Plan_formation> findAllPlan_formationByFormationId(Long id);
    List<Plan_formation> findAllPlan_formationByPlanId(Long id);
    void deletePlan_formationByFormationId(Long id);
}
