package com.example.formationservice.service;

import com.example.formationservice.entities.*;
import com.example.formationservice.feign.EmployeRestClient;
import com.example.formationservice.models.*;
import com.example.formationservice.repositories.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class FormationServiceImpl implements FormationService {

    private FormationRepository formationRepository;
    private PlanRepository planRepository;
    private CollaborateurRepository collaborateurRepository;
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

    @Override
    public void addDemande(AddById add) {
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
    public List<Plan> getAllPlans() {
        List<Plan> plans = planRepository.findAll();
        plans.forEach(plan->{
            Employe employe = employeRestClient.getEmployeById(plan.getResponsable().getEmpolyeID());
            plan.getResponsable().setEmploye(employe);
        });

        return plans;
    }

    @Override
    public Plan findPlanByName(String planName) {

        Plan plan = planRepository.findByName(planName);
        Employe employe = employeRestClient.getEmployeById(plan.getResponsable().getEmpolyeID());
        plan.getResponsable().setEmploye(employe);

        return plan;
    }

    @Override
    public Plan findPlanById(Long id) {
        Plan plan = planRepository.findPlanById(id);

        Employe employe = employeRestClient.getEmployeById(plan.getResponsable().getEmpolyeID());
        plan.getResponsable().setEmploye(employe);

        return plan;
    }

    @Override
    public List<Collaborateur> getCollaborateurs() {
        List<Collaborateur> col = collaborateurRepository.findAll();
        col.forEach(c->{
            c.setEmploye(employeRestClient.getEmployeById(c.getEmpolyeID()));
        });

        return col;
    }
    @Override
    public List<Coll> getColl() {
        List<Collaborateur> col = collaborateurRepository.findAll();
        List<Coll> coll = new ArrayList<>();
        col.forEach(c->{
            c.setEmploye(employeRestClient.getEmployeById(c.getEmpolyeID()));
            coll.add(new Coll(c.getId(), c.getEmploye().getNom()));
        });

        return coll;
    }

    @Override
    public Collaborateur findCollaborateurById(Long id) {
        Collaborateur col = collaborateurRepository.findCollaborateurById(id);
        col.setEmploye(employeRestClient.getEmployeById(col.getEmpolyeID()));

        return col;
    }

    @Override
    public Collaborateur findCollaborateurByEmployeId(Long employeID) {
        Collaborateur col = collaborateurRepository.findCollaborateurByEmpolyeID(employeID);
        col.setEmploye(employeRestClient.getEmployeById(employeID));

        return col;
    }

    @Override
    public Employe getEmployeById(Long id) {
        return employeRestClient.getEmployeById(id);
    }

    @Override
    public List<Collaborateur> getAllCollFromFormation(Long idForm) {
        List<Collaborateur> listColl = collaborateurRepository.findAll();
        List<Collaborateur> listCollFromForm = new ArrayList<Collaborateur>();
        listColl.forEach(coll -> {
            coll.getFormations().forEach(fr -> {
                if (fr.getId().equals(idForm)){
                    coll.setEmploye(employeRestClient.getEmployeById(coll.getEmpolyeID()));
                    listCollFromForm.add(coll);
                }
            });
        });

        return listCollFromForm;
    }

    @Override
    public List<Formation> getAllFormFromPlan(Long idPlan) {
        List<Formation> listForm = formationRepository.findAll();
        List<Formation> listFormFromPlan = new ArrayList<Formation>();
        listForm.forEach(lf -> {
            lf.getPlan().forEach(pl -> {
                if (pl.getId().equals(idPlan)){
                    listFormFromPlan.add(lf);
                }
            });
        });

        return listFormFromPlan;
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
