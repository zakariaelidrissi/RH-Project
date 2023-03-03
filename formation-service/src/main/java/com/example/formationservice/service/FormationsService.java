package com.example.formationservice.service;

import com.example.formationservice.entities.*;
import com.example.formationservice.feign.EmployeRestClient;
import com.example.formationservice.models.AddById;
import com.example.formationservice.models.DemandeRequest;
import com.example.formationservice.models.Employe;
import com.example.formationservice.models.PlanRequest;
import com.example.formationservice.repositories.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class FormationsService {

    private FormationRepository formationRepository;
    private PlanRepository planRepository;
    private DemandeRepository demandeRepository;
    private EmployeRestClient employeRestClient;
    private FormationEmployeRepository formationEmployeRepository;
    private PlanFormationRepository planFormationRepository;


    // TODO : ***************** GET ***********************
    public Employe getEmployeById(Long id) {
        return employeRestClient.getEmployeById(id);
    }

    public List<Formation> getFormations(){
        return formationRepository.findAll();
    }

    public Formation getFormationById(Long id) { return formationRepository.findFormationById(id); }

    public List<Plan> getPlans() {
        List<Plan> plans = planRepository.findAll();

        plans.forEach(p -> {
            p.setResponsable(employeRestClient.getEmployeById(p.getEmploye_id()));
        });

        return plans;
    }

    public Plan getPlanById(Long id) {
        Plan plan = planRepository.findPlanById(id);
        plan.setResponsable(employeRestClient.getEmployeById(plan.getEmploye_id()));
        return plan;
    }

    public List<Demande> getDemandes() {
        List<Demande> demandes = demandeRepository.findAll();
        demandes.forEach(d -> {
            d.setEmploye(employeRestClient.getEmployeById(d.getEmployeId()));
            d.setFormation(formationRepository.findFormationById(d.getFormationId()));
        });

        return demandes;
    }

    public Demande getDemandeById(Long id) {
        Demande demande = demandeRepository.findDemandeById(id);
        demande.setEmploye(employeRestClient.getEmployeById(demande.getEmployeId()));
        demande.setFormation(formationRepository.findFormationById(demande.getFormationId()));

        return demande;
    }

    public List<Employe> getAllEmpFromFormById(Long formationId){
        List<Employe> employes = new ArrayList<>();

        List<Formation_employe> formation_employes = formationEmployeRepository.findAllFormation_employeByFormationId(formationId);

        formation_employes.forEach(fe -> {
            employes.add    (employeRestClient.getEmployeById(fe.getEmployeId()));
        });

        return employes;
    }

    public List<Formation> getAllFormEmpById(Long employeId) {
        List<Formation> formations = new ArrayList<>();

        List<Formation_employe> formation_employes = formationEmployeRepository.findAllFormation_employeByEmployeId(employeId);

        formation_employes.forEach(fe -> {
            formations.add(formationRepository.findFormationById(fe.getFormationId()));
        });

        return formations;
    }

    public List<Plan> getAllPlanFormById(Long formationId) {
        List<Plan> plans = new ArrayList<>();

        List<Plan_formation> plan_formations = planFormationRepository.findAllPlan_formationByFormationId(formationId);

        plan_formations.forEach(pf -> {
            Plan pl = planRepository.findPlanById(pf.getPlanId());
            pl.setResponsable(getEmployeById(pl.getEmploye_id()));
            plans.add(pl);
        });

        return plans;
    }

    public List<Formation> getAllFormPlanById(Long planId) {
        List<Formation> formations = new ArrayList<>();

        List<Plan_formation> plan_formations = planFormationRepository.findAllPlan_formationByPlanId(planId);

        plan_formations.forEach(pf -> {
            formations.add(formationRepository.findFormationById(pf.getFormationId()));
        });

        return formations;
    }

    public List<Demande> getAllDemandesByEmpId(Long empId) {
        List<Demande> demandes = demandeRepository.findAllDemandeByEmployeId(empId);

        demandes.forEach(d -> {
            d.setEmploye(employeRestClient.getEmployeById(d.getEmployeId()));
            d.setFormation(formationRepository.findFormationById(d.getFormationId()));
        });

        return demandes;
    }

    public List<Demande> getAllDemandesByFormId(Long formationId) {
        List<Demande> demandes = demandeRepository.findAllDemandeByFormationId(formationId);

        demandes.forEach(d -> {
            d.setEmploye(employeRestClient.getEmployeById(d.getEmployeId()));
            d.setFormation(formationRepository.findFormationById(d.getFormationId()));
        });

        return demandes;
    }

    // TODO : ***************** POST ***********************
    public void addFormation(Formation formation) {
        formationRepository.save(formation);
    }

    public void addPlan(PlanRequest plReq) {
        Plan plan = new Plan();
        plan.setName(plReq.getName());
        plan.setPlanDate(plReq.getPlanDate());
        plan.setEmploye_id(plReq.getEmploye_id());
        planRepository.save(plan);
    }

    public void addDemande(DemandeRequest dmReq) {
        Demande demande = new Demande();
        demande.setDateDemande(dmReq.getDateDemande());
        demande.setEmployeId(dmReq.getEmployeId());
        demande.setFormationId(dmReq.getFormationId());
        demande.setStatus(dmReq.getStatus());

        demandeRepository.save(demande);
    }

    public void addEmployeToForm(AddById add){
        Formation_employe formation_employe = new Formation_employe();
        formation_employe.setEmployeId(add.getId1());
        formation_employe.setFormationId(add.getId2());
        formationEmployeRepository.save(formation_employe);
    }

    public void addFormToPlan(AddById add) {
        Plan_formation plan_formation = new Plan_formation();
        plan_formation.setFormationId(add.getId1());
        plan_formation.setPlanId(add.getId2());
        planFormationRepository.save(plan_formation);
    }

    // TODO : ***************** PUT ***********************
    public void updateFormation(Formation formReq) {
        Formation formation = formationRepository.findFormationById(formReq.getId());
        formation.setName(formReq.getName());
        formation.setFormationDate(formReq.getFormationDate());
        formation.setDuree(formReq.getDuree());
        formation.setObjectif(formReq.getObjectif());
        formationRepository.save(formation);
    }

    public void updatePlan(PlanRequest plReq) {
        Plan plan = planRepository.findPlanById(plReq.getId());
        plan.setName(plan.getName());
        plan.setPlanDate(plReq.getPlanDate());
        plan.setEmploye_id(plReq.getEmploye_id());
        planRepository.save(plan);
    }

    public void updateDemande(DemandeRequest dmReq) {
        Demande demande = demandeRepository.findDemandeById(dmReq.getId());
        //demande.setDateDemande(dmReq.getDateDemande());
        //demande.setEmployeId(dmReq.getEmployeId());
        //demande.setFormationId(dmReq.getFormationId());
        demande.setStatus(dmReq.getStatus());

        demandeRepository.save(demande);
    }

    // TODO : ***************** DELETE ***********************
    public void deleteFormation(Long id) {
        formationRepository.deleteById(id);
    }

    public void deletePlan(Long id) {
        planRepository.deleteById(id);
    }

    public void deleteDemande(Long id) {
        demandeRepository.deleteById(id);
    }

    public void deleteEmpFromForm(Long idFrom,Long idEmp) {
        formationEmployeRepository.deleteByFormationIdAndEmployeId(idFrom,idEmp);
    }

    public void deleteFormFromPlan(Long id) {
        planFormationRepository.deletePlan_formationByFormationId(id);
    }

}
