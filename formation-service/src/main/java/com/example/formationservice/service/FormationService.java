package com.example.formationservice.service;

import com.example.formationservice.entities.Collaborateur;
import com.example.formationservice.entities.Formation;
import com.example.formationservice.entities.Plan;
import com.example.formationservice.models.AddById;
import com.example.formationservice.models.CollaborateurRequest;
import com.example.formationservice.models.FormationRequest;
import com.example.formationservice.models.PlanRequest;

import java.util.List;

public interface FormationService {

    // ********************** POST ***************************************
    void addNewFormation(FormationRequest formation);
    void addNewPlan(PlanRequest plan);
    void addNewCollaborateur(CollaborateurRequest collaborateur);
    //void addNewModule(Module module);
    void addCollaborateurToFormation(AddById add);
    void addFormationToPlan(AddById add);
    //void addModuleToPlan(AddWithStr add);
    void addDemande(AddById add);

    // ********************** PUT ***************************************
    void updatePlan(PlanRequest planRequest, Long id);
    void updateFormation(FormationRequest formation, Long id);

    // ********************** GET ***************************************
    Formation findFormationByName(String formationName);
    Formation findFormationById(Long id);
    List<Formation> getAllFormation();
    Plan findPlanByName(String planName);
    Plan findPlanById(Long id);
    //Module findModuleByName(String moduleName);
    //Collaborateur findCollaborateurByCin(String cin);
    Collaborateur findCollaborateurById(Long id);
    Collaborateur findCollaborateurByEmployeId(Long userId);
    //void addCollaborateurToFormation(String cin, String formationName);

    // ********************** DELETE ***************************************
    void deleteFormation(Long id);
    void deletePlan(Long id);
    void deleteFormationFromPlan(Long formationId, Long planId);
    void deleteCollFromFormation(Long CollId, Long FormID);
    void deleteCollaborateur(Long id);
}
