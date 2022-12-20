package com.example.formationservice.service;

import com.example.formationservice.entities.Collaborateur;
import com.example.formationservice.entities.Demande;
import com.example.formationservice.entities.Formation;
import com.example.formationservice.entities.Plan;
import com.example.formationservice.models.*;

import java.util.List;

public interface FormationService {

    // ********************** POST ***************************************
    void addNewFormation(FormationRequest formation);
    void addNewPlan(PlanRequest plan);
    void addNewCollaborateur(CollaborateurRequest collaborateur);
    void addCollaborateurToFormation(AddById add);
    void addFormationToPlan(AddById add);
    void addDemande(AddById add);

    // ********************** PUT ***************************************
    void updatePlan(PlanRequest planRequest, Long id);
    void updateFormation(FormationRequest formation, Long id);
    void updateDemande(Long id, String status);

    // ********************** GET ***************************************
    Formation findFormationByName(String formationName);
    Formation findFormationById(Long id);
    List<Formation> getAllFormation();
    List<Plan> getAllPlans();
    Plan findPlanByName(String planName);
    Plan findPlanById(Long id);
    List<Collaborateur> getCollaborateurs();
    List<Coll> getColl();
    Collaborateur findCollaborateurById(Long id);
    Demande findDemandeById(Long id);
    List<Demande> getAllDemande();
    Collaborateur findCollaborateurByEmployeId(Long userId);
    Employe getEmployeById(Long id);
    List<Collaborateur> getAllCollFromFormation(Long idForm);
    List<Formation> getAllFormFromPlan(Long idPlan);
    List<Demande> getAllCollDemandes(Long empId);

    // ********************** DELETE ***************************************
    void deleteFormation(Long id);
    void deletePlan(Long id);
    void deleteFormationFromPlan(Long formationId, Long planId);
    void deleteCollFromFormation(Long CollId, Long FormID);
    void deleteCollaborateur(Long id);
    void deleteDemande(Long id);
}
