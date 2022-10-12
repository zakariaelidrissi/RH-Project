package com.example.formationservice.web;

import com.example.formationservice.entities.Collaborateur;
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
    private PlanRepository planRepository;
    private CollaborateurRepository collaborateurRepository;
    private EmployeRestClient employeRestClient;

    // ********************** GET ***************************************
    @GetMapping("/listFormations")
    public List<Formation> listFormations(){
        return formationService.getAllFormation();
    }

    @GetMapping("/listFormations/name/{formationName}")
    public Formation getFormation(@PathVariable String formationName){
        return formationService.findFormationByName(formationName);
    }

    @GetMapping("/listFormations/{id}")
    public Formation getFormationById(@PathVariable Long id){
        return formationService.findFormationById(id);
    }

    @GetMapping("/listPlans")
    public List<Plan> getPlans(){
        List<Plan> plans = planRepository.findAll();
        plans.forEach(plan->{
            Employe employe = employeRestClient.getEmployeById(plan.getResponsable().getEmpolyeID());
            plan.getResponsable().setEmploye(employe);
        });
        return plans;
    }

    @GetMapping("/listPlans/name/{planName}")
    public Plan getPlan(@PathVariable String planName){
        Plan plan = formationService.findPlanByName(planName);
        Employe employe = employeRestClient.getEmployeById(plan.getResponsable().getEmpolyeID());
        plan.getResponsable().setEmploye(employe);
        return plan;
    }

    @GetMapping("/listPlans/{id}")
    public Plan getPlanById(@PathVariable Long id){
        Plan plan = formationService.findPlanById(id);

        Employe employe = employeRestClient.getEmployeById(plan.getResponsable().getEmpolyeID());
        plan.getResponsable().setEmploye(employe);

        return plan;
    }

    @GetMapping("/listCollaborateurs")
    public List<Collaborateur> getCollaborateurs(){
        List<Collaborateur> col = collaborateurRepository.findAll();
        col.forEach(c->{
            c.setEmploye(employeRestClient.getEmployeById(c.getEmpolyeID()));
        });

        return col;
    }

    /*@GetMapping("/collaborateurs/cin/{cin}")
    public Collaborateur getCollaborateur(@PathVariable String cin){
        Collaborateur col = formationService.findCollaborateurByCin(cin);
        col.setEmploye(userRestClient.getEmployeById(col.getEmpolyeID()));

        return col;
    }*/

    @GetMapping("/collaborateurs/{id}")
    public Collaborateur getCollaborateurById(@PathVariable Long id){
        Collaborateur col = formationService.findCollaborateurById(id);
        col.setEmploye(employeRestClient.getEmployeById(col.getEmpolyeID()));

        return col;
    }

    @GetMapping("/collaborateurs/employe/{id}")
    public Collaborateur getCollaborateurByUserId(@PathVariable Long id){
        Collaborateur col = formationService.findCollaborateurByEmployeId(id);
        col.setEmploye(employeRestClient.getEmployeById(id));

        return col;
    }

    @GetMapping(path = "/getEmploye/{id}")
    public Employe getEmploye(@PathVariable Long id){
        return employeRestClient.getEmployeById(id);
    }

    /*@GetMapping("/modules/{name}")
    Module getModule(@PathVariable String name){
        return formationService.findModuleByName(name);
    }*/

    // ********************** POST ***************************************

    /*@PostMapping(path = "/addModuleToPlan")
    void addModuleToPlan(@RequestBody AddWithStr add){
        formationService.addModuleToPlan(add);
    }*/

    @PostMapping(path = "/addFormation")
    public void addFormation(@RequestBody FormationRequest formation){
        formationService.addNewFormation(formation);
    }

    @PostMapping(path = "/addPlan")
    public void addPlan(@RequestBody PlanRequest plan){
        formationService.addNewPlan(plan);
    }

    @PostMapping(path = "/addFormationToPlan")
    public void addFormationToPlan(@RequestBody AddById add) {
        formationService.addFormationToPlan(add);
    }

    @PostMapping(path = "/addCollaborateur")
    public void addCollaborateur(@RequestBody CollaborateurRequest collaborateur){formationService.addNewCollaborateur(collaborateur);}

    @PostMapping(path = "/addCollToFormation")
    public void addCollaborateurToFormation(@RequestBody AddById add){
        formationService.addCollaborateurToFormation(add);
    }

    @PostMapping(path = "/addDemande")
    public void addDemande(@RequestBody AddById add){
        formationService.addDemande(add);
    }

    // ********************** PUT ***************************************
    @PutMapping(path = "/updateFormation/{id}")
    public void updateFormation(@RequestBody FormationRequest formation, @PathVariable Long id){
        formationService.updateFormation(formation, id);
    }

    @PutMapping(path = "/updatePlan/{id}")
    public void updatePlan(@RequestBody PlanRequest plan, @PathVariable Long id){
        //formationService.addNewPlan(plan);
        formationService.updatePlan(plan, id);
    }

    // ********************** DELETE ***************************************
    @DeleteMapping(path = "/deleteFormation/{id}")
    public void deleteFormatio(@PathVariable Long id){
        formationService.deleteFormation(id);
    }

    @DeleteMapping(path = "/deletePlan/{id}")
    public void deletePlan(@PathVariable Long id){
        formationService.deletePlan(id);
    }

    @DeleteMapping(path = "/deleteFormationFromPlan/{formationId}/{planId}")
    public void deleteFormationToPlan(@PathVariable Long formationId, @PathVariable Long planId){
        formationService.deleteFormationFromPlan(formationId, planId);
    }

    @DeleteMapping(path = "/deleteCollFromFormation/{collId}/{formationId}")
    public void deleteCollFromFormation(@PathVariable Long collId, @PathVariable Long formationId){
        formationService.deleteCollFromFormation(collId, formationId);
    }

    @DeleteMapping(path = "/deleteColl/{id}")
    public void deleteCollaborateur(@PathVariable Long id){
        formationService.deleteCollaborateur(id);
    }
}
