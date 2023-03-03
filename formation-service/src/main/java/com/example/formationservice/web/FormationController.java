package com.example.formationservice.web;

import com.example.formationservice.entities.Demande;
import com.example.formationservice.entities.Formation;
import com.example.formationservice.entities.Plan;
import com.example.formationservice.models.*;
import com.example.formationservice.service.FormationsService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
public class FormationController {

    private FormationsService formationService;

    // TODO : ***************** GET ***********************
    @GetMapping("/formations")
    public List<Formation> listFormations(){
        return formationService.getFormations();
    }

    @GetMapping("/formations/{id}")
    public Formation getFormationById(@PathVariable Long id){
        return formationService.getFormationById(id);
    }

    @GetMapping("/plans")
    public List<Plan> getPlans(){
        return formationService.getPlans();
    }

    @GetMapping("/plans/{id}")
    public Plan getPlanById(@PathVariable Long id){
        return formationService.getPlanById(id);
    }

    @GetMapping(path = "/getEmploye/{id}")
    public Employe getEmploye(@PathVariable Long id){
        return formationService.getEmployeById(id);
    }

    @GetMapping(path = "/listEmpFromForm/{idForm}")
    public List<Employe> getAllEmpFromFormation(@PathVariable Long idForm){
        return formationService.getAllEmpFromFormById(idForm);
    }

    @GetMapping(path = "/listFormFromPlan/{idPlan}")
    public List<Formation> getAllFormFromPlan(@PathVariable Long idPlan) {
        return formationService.getAllFormPlanById(idPlan);
    }

    @GetMapping(path = "/demandes")
    public List<Demande> getAllDemandes(){
        return formationService.getDemandes();
    }

    @GetMapping(path = "/demandes/{id}")
    public Demande getDemandeById(@PathVariable Long id){
        return formationService.getDemandeById(id);
    }

    @GetMapping(path = "/empFormation/{employeId}")
    public List<Formation> getAllFormEmpById(@PathVariable Long employeId){
        return formationService.getAllFormEmpById(employeId);
    }

    @GetMapping(path = "/planFormation/{formationId}")
    public List<Plan> getAllPlanFormById(@PathVariable Long formationId) {
        return formationService.getAllPlanFormById(formationId);
    }

    @GetMapping(path = "/demandes/byEmpId/{empId}")
    public List<Demande> getAllEmpDemandes(@PathVariable Long empId){
        return formationService.getAllDemandesByEmpId(empId);
    }

    @GetMapping(path = "/demandes/byFormId/{formId}")
    public List<Demande> getAllDemandesByFormId(@PathVariable Long formId) {
        return formationService.getAllDemandesByFormId(formId);
    }

    // TODO : ***************** POST ***********************

    @PostMapping(path = "/formations")
    public void addFormation(@RequestBody Formation formation){
        formationService.addFormation(formation);
    }

    @PostMapping(path = "/plans")
    public void addPlan(@RequestBody PlanRequest plan){
        formationService.addPlan(plan);
    }

    @PostMapping(path = "/addFormationToPlan")
    public void addFormationToPlan(@RequestBody AddById add) {
        formationService.addFormToPlan(add);
    }

    @PostMapping(path = "/addEmpToFormation")
    public void addEmployeToFormation(@RequestBody AddById add){
        formationService.addEmployeToForm(add);
    }

    @PostMapping(path = "/demandes")
    public void addDemande(@RequestBody DemandeRequest add){
        formationService.addDemande(add);
    }

    // TODO : ***************** PUT ***********************
    @PutMapping(path = "/formations")
    public void updateFormation(@RequestBody Formation formation){
        formationService.updateFormation(formation);
    }

    @PutMapping(path = "/plans")
    public void updatePlan(@RequestBody PlanRequest plan){
        formationService.updatePlan(plan);
    }

    @PutMapping(path = "/demandes")
    public void updateDemande(@RequestBody DemandeRequest dmReq){
        formationService.updateDemande(dmReq);
    }

    // TODO : ***************** DELETE ***********************
    @DeleteMapping(path = "/formations/{id}")
    public void deleteFormatio(@PathVariable Long id){
        formationService.deleteFormation(id);
    }

    @DeleteMapping(path = "/plans/{id}")
    public void deletePlan(@PathVariable Long id){
        formationService.deletePlan(id);
    }

    @DeleteMapping(path = "/deleteFormationFromPlan/{id}")
    public void deleteFormationFromPlan(@PathVariable Long id){
        formationService.deleteFormFromPlan(id);
    }

    @DeleteMapping(path = "/deleteEmpFromFormation/{idFrom}/{idEmp}")
    public void deleteEmpFromFormation(@PathVariable Long idFrom,@PathVariable Long idEmp){
        formationService.deleteEmpFromForm(idFrom, idEmp);
    }

    @DeleteMapping("/demandes/{id}")
    public void deleteDemande(@PathVariable Long id){
        formationService.deleteDemande(id);
    }
}
