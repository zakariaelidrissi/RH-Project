package com.example.formationservice.web;

import com.example.formationservice.entities.Collaborateur;
import com.example.formationservice.entities.Demande;
import com.example.formationservice.entities.Formation;
import com.example.formationservice.entities.Plan;
import com.example.formationservice.feign.EmployeRestClient;
import com.example.formationservice.models.*;
import com.example.formationservice.repositories.CollaborateurRepository;
import com.example.formationservice.repositories.PlanRepository;
import com.example.formationservice.service.FormationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
public class FormationController {

    private FormationService formationService;

    // ********************** GET ***************************************
    @GetMapping("/formations")
    public List<Formation> listFormations(){
        return formationService.getAllFormation();
    }

    @GetMapping("/formations/name/{formationName}")
    public Formation getFormation(@PathVariable String formationName){
        return formationService.findFormationByName(formationName);
    }

    @GetMapping("/formations/{id}")
    public Formation getFormationById(@PathVariable Long id){
        return formationService.findFormationById(id);
    }

    @GetMapping("/plans")
    public List<Plan> getPlans(){
        return formationService.getAllPlans();
    }

    @GetMapping("/plans/name/{planName}")
    public Plan getPlan(@PathVariable String planName){
        return formationService.findPlanByName(planName);
    }

    @GetMapping("/plans/{id}")
    public Plan getPlanById(@PathVariable Long id){
        return formationService.findPlanById(id);
    }

    @GetMapping("/collaborateurs")
    public List<Collaborateur> getCollaborateurs(){
        return formationService.getCollaborateurs();
    }

    @GetMapping(path = "/coll")
    public List<Coll> getColl() {
        return formationService.getColl();
    }

    @GetMapping("/collaborateurs/{id}")
    public Collaborateur getCollaborateurById(@PathVariable Long id){
        return formationService.findCollaborateurById(id);
    }

    @GetMapping("/collaborateurs/employe/{id}")
    public Collaborateur getCollaborateurByEmployeId(@PathVariable Long id){
        return formationService.findCollaborateurByEmployeId(id);
    }

    @GetMapping(path = "/getEmploye/{id}")
    public Employe getEmploye(@PathVariable Long id){
        return formationService.getEmployeById(id);
    }

    @GetMapping(path = "/listCollFromForm/{idForm}")
    public List<Collaborateur> getAllCollFromFormation(@PathVariable Long idForm){
        return formationService.getAllCollFromFormation(idForm);
    }

    @GetMapping(path = "/listFormFromPlan/{idPlan}")
    public List<Formation> getAllFormFromPlan(@PathVariable Long idPlan) {
        return formationService.getAllFormFromPlan(idPlan);
    }

    @GetMapping(path = "/demandes/{id}")
    public Demande getDemandeById(@PathVariable Long id){
        return formationService.findDemandeById(id);
    }

    @GetMapping(path = "/demandes")
    public List<Demande> getAllDemandes(){
        return formationService.getAllDemande();
    }

    @GetMapping(path = "/demandes/byColl/{empId}")
    public List<Demande> getAllCollDemandes(@PathVariable Long empId){
        return formationService.getAllCollDemandes(empId);
    }

    // ********************** POST ***************************************

    @PostMapping(path = "/formations")
    public void addFormation(@RequestBody FormationRequest formation){
        formationService.addNewFormation(formation);
    }

    @PostMapping(path = "/plans")
    public void addPlan(@RequestBody PlanRequest plan){
        formationService.addNewPlan(plan);
    }

    @PostMapping(path = "/addFormationToPlan")
    public void addFormationToPlan(@RequestBody AddById add) {
        formationService.addFormationToPlan(add);
    }

    @PostMapping(path = "/collaborateurs")
    public void addCollaborateur(@RequestBody CollaborateurRequest collaborateur){formationService.addNewCollaborateur(collaborateur);}

    @PostMapping(path = "/addCollToFormation")
    public void addCollaborateurToFormation(@RequestBody AddById add){
        formationService.addCollaborateurToFormation(add);
    }

    @PostMapping(path = "/demandes")
    public void addDemande(@RequestBody AddById add){
        formationService.addDemande(add);
    }

    // ********************** PUT ***************************************
    @PutMapping(path = "/formations/{id}")
    public void updateFormation(@RequestBody FormationRequest formation, @PathVariable Long id){
        formationService.updateFormation(formation, id);
    }

    @PutMapping(path = "/plans/{id}")
    public void updatePlan(@RequestBody PlanRequest plan, @PathVariable Long id){
        formationService.updatePlan(plan, id);
    }

    // @PutMapping(path = "/demandes/{idDm}/{status}")
    //public void updateDemande(@PathVariable Long idDm, @PathVariable String status){
    @PutMapping(path = "/demandes")
    public void updateDemande(@RequestBody DemandeRequest dmReq){
        formationService.updateDemande(dmReq.getId(), dmReq.getStatus());
    }

    // ********************** DELETE ***************************************
    @DeleteMapping(path = "/formations/{id}")
    public void deleteFormatio(@PathVariable Long id){
        formationService.deleteFormation(id);
    }

    @DeleteMapping(path = "/plans/{id}")
    public void deletePlan(@PathVariable Long id){
        formationService.deletePlan(id);
    }

    @DeleteMapping(path = "/deleteFormationFromPlan/{formationId}/{planId}")
    public void deleteFormationFromPlan(@PathVariable Long formationId, @PathVariable Long planId){
        formationService.deleteFormationFromPlan(formationId, planId);
    }

    @DeleteMapping(path = "/deleteCollFromFormation/{collId}/{formationId}")
    public void deleteCollFromFormation(@PathVariable Long collId, @PathVariable Long formationId){
        formationService.deleteCollFromFormation(collId, formationId);
    }

    @DeleteMapping(path = "/collaborateurs/{idEmpl}")
    public void deleteCollaborateur(@PathVariable Long idEmpl){
        formationService.deleteCollaborateur(idEmpl);
    }

    @DeleteMapping("/demandes/{id}")
    public void deleteDemande(@PathVariable Long id){
        formationService.deleteDemande(id);
    }
}
