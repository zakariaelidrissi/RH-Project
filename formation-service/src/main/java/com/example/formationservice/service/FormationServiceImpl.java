package com.example.formationservice.service;

import com.example.formationservice.entities.*;
import com.example.formationservice.feign.EmployeRestClient;
import com.example.formationservice.models.*;
import com.example.formationservice.repositories.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class FormationServiceImpl implements FormationService {

    private FormationRepository formationRepository;
    private PlanRepository planRepository;
    private CollaborateurRepository collaborateurRepository;
    //private ModuleRepository moduleRepository;
    private DemandeRepository demandeRepository;
    private EmployeRestClient employeRestClient;

    // ********************** POST ***************************************
    @Override
    public void addNewFormation(FormationRequest formationRequest) {
        Formation formation = new Formation();
        formation.setDuree(formationRequest.getDuree());
        formation.setFormationDate(formationRequest.getFormationDate());
        formation.setName(formationRequest.getName());
        formation.setObjectif(formationRequest.getObjectif());
        formationRepository.save(formation);
    }

    @Override
    public void addNewPlan(PlanRequest planRequest) {
        Plan plan = new Plan();
        Collaborateur coll = findCollaborateurById(planRequest.getResponsableID());

        plan.setName(planRequest.getName());
        plan.setPlanDate(planRequest.getPlanDate());
        plan.setResponsable(coll);
        planRepository.save(plan);
    }

    @Override
    public void addNewCollaborateur(CollaborateurRequest collaborateur) {
        Collaborateur coll = new Collaborateur();
        coll.setEmpolyeID(collaborateur.getEmployeId());
        collaborateurRepository.save(coll);
    }

    /*@Override
    public void addNewModule(Module module) {
        moduleRepository.save(module);
    }*/

    @Override
    public void addCollaborateurToFormation(AddById add) {
        Collaborateur collaborateur = findCollaborateurById(add.getId1());
        Formation formation = findFormationById(add.getId2());

        if (collaborateur.getFormations() != null){
            collaborateur.getFormations().add(formation);
            formation.getCollaborateurs().add(collaborateur);
        }
    }

    @Override
    public void addFormationToPlan(AddById add) {
        Formation formation = findFormationById(add.getId1());
        Plan plan = findPlanById(add.getId2());

        if(formation.getPlan() != null) {
            formation.getPlan().add(plan);
            plan.getFormation().add(formation);
        }
    }

    /*@Override
    public void addModuleToPlan(AddWithStr add) {
        Module module = findModuleByName(add.getStr1());
        Plan plan = findPlanByName(add.getStr2());

        if (plan.getModules() != null){
            plan.getModules().add(module);
            module.getPlans().add(plan);
        }
    }*/

    @Override
    public void addDemande(AddById add) {
        //Collaborateur collaborateur = collaborateurRepository.findCollaborateurById(add.getId());
        Collaborateur collaborateur = collaborateurRepository.findCollaborateurById(add.getId1());
        Formation formation = formationRepository.findFormationById(add.getId2());
        Demande demande = new Demande();
        demande.setCollaborateur(collaborateur);
        demande.setFormation(formation);
        demande.setDateDemande(new Date());
        demandeRepository.save(demande);
    }

    @Override
    public void updatePlan(PlanRequest planRequest, Long id) {
        Plan plan = findPlanById(id);
        Collaborateur coll = findCollaborateurById(planRequest.getResponsableID());

        plan.setName(planRequest.getName());
        plan.setPlanDate(planRequest.getPlanDate());
        plan.setResponsable(coll);
        planRepository.save(plan);

    }

    @Override
    public void updateFormation(FormationRequest formationRequest, Long id){
        Formation formation = findFormationById(id);
        formation.setDuree(formationRequest.getDuree());
        formation.setFormationDate(formationRequest.getFormationDate());
        formation.setName(formationRequest.getName());
        formation.setObjectif(formationRequest.getObjectif());
        formationRepository.save(formation);
    }

    // ********************** GET ***************************************
    @Override
    public Formation findFormationByName(String formationName) {

        return formationRepository.findByName(formationName);
    }

    @Override
    public Formation findFormationById(Long id) {
        return formationRepository.findFormationById(id);
    }

    @Override
    public List<Formation> getAllFormation() {
        List<Formation> listF = formationRepository.findAll();

        listF.forEach(f -> {
            f.getPlan().forEach(p -> {
                Employe employe = employeRestClient.getEmployeById(p.getResponsable().getEmpolyeID());
                p.getResponsable().setEmploye(employe);
            });
        });

        return listF;
    }

    @Override
    public Plan findPlanByName(String planName) {

        return planRepository.findByName(planName);
    }

    @Override
    public Plan findPlanById(Long id) {
        return planRepository.findPlanById(id);
    }

    /*@Override
    public Module findModuleByName(String moduleName) {

        return moduleRepository.findByName(moduleName);
    }*/

    /*@Override
    public Collaborateur findCollaborateurByCin(String cin) {
        return collaborateurRepository.findByCin(cin);
    }*/

    @Override
    public Collaborateur findCollaborateurById(Long id) {
        return collaborateurRepository.findCollaborateurById(id);
    }

    @Override
    public Collaborateur findCollaborateurByEmployeId(Long employeID) {
        return collaborateurRepository.findCollaborateurByEmpolyeID(employeID);
    }

    // ********************** DELETE ***************************************
    @Override
    public void deleteFormation(Long id) {
        formationRepository.deleteById(id);
    }

    @Override
    public void deletePlan(Long id) {
        planRepository.deleteById(id);
    }

    @Override
    public void deleteFormationFromPlan(Long formationId, Long planId){
        Formation formation = findFormationById(formationId);
        Plan plan = findPlanById(planId);

        if(plan.getFormation() != null) {
            plan.getFormation().remove(formation);
            formation.getPlan().remove(plan);
        }
    }

    @Override
    public void deleteCollFromFormation(Long CollId, Long FormID){
        Formation formation = findFormationById(FormID);
        Collaborateur coll = findCollaborateurById(CollId);

        if (coll.getFormations() != null) {
            coll.getFormations().remove(formation);
            formation.getCollaborateurs().remove(coll);
        }
    }

    @Override
    public void deleteCollaborateur(Long id){
        Collaborateur collaborateur = findCollaborateurByEmployeId(id);
        collaborateurRepository.deleteCollaborateurById(collaborateur.getId());
    }

}
