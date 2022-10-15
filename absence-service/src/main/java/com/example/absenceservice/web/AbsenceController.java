package com.example.absenceservice.web;

import com.example.absenceservice.entities.EmployeAbsence;
import com.example.absenceservice.entities.Demande;
import com.example.absenceservice.feign.EmployeRestClient;
import com.example.absenceservice.model.AbsenceRequest;
import com.example.absenceservice.model.DemandeRequest;
import com.example.absenceservice.model.Employe;
import com.example.absenceservice.repositories.AbsenceRepository;
import com.example.absenceservice.repositories.DemandeRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin("*")
public class AbsenceController {

    private EmployeRestClient employeRestClient;
    private AbsenceRepository absenceRepository;
    private DemandeRepository demandeRepository;

    // ************************* GET ************************
    @GetMapping(path = "/getEmploye/{id}")
    public Employe getEmploye(@PathVariable Long id){
        return employeRestClient.getEmployeById(id);
    }

    @GetMapping(path = "/absences")
    public List<EmployeAbsence> getAllAbs(){
        List<EmployeAbsence> listAbs = absenceRepository.findAll();

        listAbs.forEach(abs -> {
            abs.setEmploye(getEmploye(abs.getEmployeId()));
        });

        return listAbs;
    }

    @GetMapping(path = "/absences/date/{date}")
    public List<EmployeAbsence> getAllAbsByDate(@PathVariable Date date){
        List<EmployeAbsence> listAbs = absenceRepository.findEmployeAbsenceByDateAbs(date);

        listAbs.forEach(abs -> {
            abs.setEmploye(getEmploye(abs.getEmployeId()));
        });

        return listAbs;
    }

    @GetMapping(path = "/absences/{id}")
    public EmployeAbsence getEmpAbsByI(@PathVariable Long id){
        EmployeAbsence abs = absenceRepository.findEmployeAbsenceById(id);
        abs.setEmploye(getEmploye(abs.getEmployeId()));
        return abs;
    }

    @GetMapping(path = "/demandes")
    public List<Demande> getAllDemandes(){
        List<Demande> listDm = demandeRepository.findAll();

        listDm.forEach(dm -> {
            dm.setEmploye(getEmploye(dm.getEmployeId()));
        });

        return listDm;
    }

    @GetMapping(path = "/demandes/{id}")
    public Demande getDemande(@PathVariable Long id){
        Demande dm = demandeRepository.findDemandeById(id);
        dm.setEmploye(getEmploye(dm.getEmployeId()));
        return dm;
    }

    // ************************* POST ************************
    @PostMapping(path = "/absences")
    public void saveEmpAbs(@RequestBody AbsenceRequest absReq){
        EmployeAbsence abs = new EmployeAbsence();
        Employe emp = employeRestClient.getEmployeById(absReq.getEmployeId());
        abs.setDateAbs(absReq.getDateAbs());
        abs.setDuree(absReq.getDuree());
        abs.setNatureAbsence(absReq.getNatureAbsence());
        abs.setEmployeId(emp.getId());
        abs.setJustificatif(absReq.isJustificatif());

        absenceRepository.save(abs);
    }

    @PostMapping(path = "/demandes")
    public void saveDm(@RequestBody DemandeRequest dmReq){
        Demande dm = new Demande();

        dm.setNatureAbsence(dmReq.getNatureAbsence());
        dm.setEmployeId(dmReq.getEmployeId());
        dm.setDateDebut(dmReq.getDateDebut());
        dm.setDateFin(dmReq.getDateFin());

        demandeRepository.save(dm);
    }

    // ************************* PUT *************************
    @PutMapping(path = "/absences/{id}")
    public void updateEmpAbs(@RequestBody AbsenceRequest absReq, @PathVariable Long id){
        EmployeAbsence abs = getEmpAbsByI(id);

        abs.setDateAbs(absReq.getDateAbs());
        abs.setDuree(absReq.getDuree());
        abs.setNatureAbsence(absReq.getNatureAbsence());
        abs.setEmployeId(absReq.getEmployeId());
        abs.setJustificatif(absReq.isJustificatif());

        absenceRepository.save(abs);
    }

    @PutMapping(path = "/demandes/{id}")
    public void updateDm(@RequestBody DemandeRequest dmReq, @PathVariable Long id){
        Demande dm = getDemande(id);

        dm.setNatureAbsence(dmReq.getNatureAbsence());
        dm.setEmployeId(dmReq.getEmployeId());
        dm.setDateDebut(dmReq.getDateDebut());
        dm.setDateFin(dmReq.getDateFin());

        demandeRepository.save(dm);
    }

    // ************************* DELETE **********************
    @DeleteMapping(path = "/absences/{id}")
    public void deleteEmpAbs(@PathVariable Long id){
        absenceRepository.deleteById(id);
    }

    @DeleteMapping(path = "demandes/{id}")
    public void deleteDm(@PathVariable Long id){
        demandeRepository.deleteById(id);
    }

}
