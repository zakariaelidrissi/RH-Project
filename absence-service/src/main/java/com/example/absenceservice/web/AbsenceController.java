package com.example.absenceservice.web;

import com.example.absenceservice.entities.EmployeAbsence;
import com.example.absenceservice.entities.Demande;
import com.example.absenceservice.entities.StagiaireAbsence;
import com.example.absenceservice.feign.EmployeRestClient;
import com.example.absenceservice.model.AbsenceRequest;
import com.example.absenceservice.model.DemandeRequest;
import com.example.absenceservice.model.Employe;
import com.example.absenceservice.model.StagiaireRequest;
import com.example.absenceservice.repositories.AbsenceRepository;
import com.example.absenceservice.repositories.DemandeRepository;
import com.example.absenceservice.service.AbsenceService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin("*")
public class AbsenceController {

    private AbsenceService absenceService;

    // ************************* GET ************************

    @GetMapping(path = "/getEmploye/{id}")
    public Employe getEmploye(@PathVariable Long id){
        return absenceService.getEmployeById(id);
    }

    @GetMapping(path = "/absences")
    public List<EmployeAbsence> getAllEmpAbs(){
        return absenceService.getAllEmpAbs();
    }

    @GetMapping(path = "/absences/stg")
    public List<StagiaireAbsence> getAllStgAbs() {
        return absenceService.getAllStgAbs();
    }

    @GetMapping(path = "/absences/date/{date}")
    public List<EmployeAbsence> getAllAbsByDate(@PathVariable Date date){
        return absenceService.getAllAbsByDate(date);
    }

    @GetMapping(path = "/absencesStg/date/{date}")
    public List<StagiaireAbsence> getAllStgAbsByDate(@PathVariable Date date){
        return absenceService.getAllStgAbsByDate(date);
    }

    @GetMapping(path = "/absences/{id}")
    public EmployeAbsence getEmpAbsById(@PathVariable Long id){
        return absenceService.getEmpAbsById(id);
    }

    @GetMapping(path = "/absences/stg/{id}")
    public StagiaireAbsence getStgAbsById(@PathVariable Long id) {
        return absenceService.getStgAbsById(id);
    }

    @GetMapping(path = "/demandes")
    public List<Demande> getAllDemandes(){
        return absenceService.getAllDemandes();
    }

    @GetMapping(path = "/demandes/{id}")
    public Demande getDemande(@PathVariable Long id){
        return absenceService.getDemandeById(id);
    }

    // ************************* POST ************************

    @PostMapping(path = "/absences")
    public void saveEmpAbs(@RequestBody AbsenceRequest absReq){
        absenceService.addEmpAbs(absReq);
    }

    @PostMapping(path = "/absences/stg")
    public void saveStgAbs(@RequestBody StagiaireRequest stgReq) {
        absenceService.addStgAbs(stgReq);
    }

    @PostMapping(path = "/demandes")
    public void saveDm(@RequestBody DemandeRequest dmReq){
        absenceService.addDmAbs(dmReq);
    }

    // ************************* PUT *************************

    @PutMapping(path = "/absences")
    public void updateEmpAbs(@RequestBody AbsenceRequest absReq){
        absenceService.updateEmpAbs(absReq);
    }

    @PutMapping(path = "/absences/stg")
    public void updateStgAbs(@RequestBody StagiaireRequest stgReq) {
        absenceService.updateStgAbs(stgReq);
    }

    @PutMapping(path = "/demandes")
    public void updateDm(@RequestBody DemandeRequest dmReq){
        absenceService.updateDm(dmReq);
    }

    // ************************* DELETE **********************

    @DeleteMapping(path = "/absences/{id}")
    public void deleteEmpAbs(@PathVariable Long id){
        absenceService.deleteEmpAbs(id);
    }

    @DeleteMapping(path = "/absences/stg/{id}")
    public void deleteStgAbs(@PathVariable Long id) {
        absenceService.deleteStgAbs(id);
    }

    @DeleteMapping(path = "demandes/{id}")
    public void deleteDm(@PathVariable Long id){
        absenceService.deleteDm(id);
    }

}
