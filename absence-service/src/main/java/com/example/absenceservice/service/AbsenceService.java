package com.example.absenceservice.service;

import com.example.absenceservice.entities.Demande;
import com.example.absenceservice.entities.EmployeAbsence;
import com.example.absenceservice.feign.EmployeRestClient;
import com.example.absenceservice.model.AbsenceRequest;
import com.example.absenceservice.model.DemandeRequest;
import com.example.absenceservice.model.Employe;
import com.example.absenceservice.repositories.AbsenceRepository;
import com.example.absenceservice.repositories.DemandeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class AbsenceService {

    private EmployeRestClient employeRestClient;
    private AbsenceRepository absenceRepository;
    private DemandeRepository demandeRepository;

    // ************************* GET ************************

    public Employe getEmployeById(Long id) {
        return employeRestClient.getEmployeById(id);
    }

    public List<EmployeAbsence> getAllEmpAbs() {
        List<EmployeAbsence> listAbs = absenceRepository.findAll();

        listAbs.forEach(abs -> {
            abs.setEmploye(getEmployeById(abs.getEmployeId()));
        });

        return listAbs;
    }

    public List<EmployeAbsence> getAllAbsByDate(Date date) {
        List<EmployeAbsence> listAbs = absenceRepository.findEmployeAbsenceByDateAbs(date);

        listAbs.forEach(abs -> {
            abs.setEmploye(getEmployeById(abs.getEmployeId()));
        });

        return listAbs;
    }

    public EmployeAbsence getEmpAbsById(Long id) {
        EmployeAbsence abs = absenceRepository.findEmployeAbsenceById(id);
        abs.setEmploye(getEmployeById(abs.getEmployeId()));
        return abs;
    }

    public List<Demande> getAllDemandes() {
        List<Demande> listDm = demandeRepository.findAll();

        listDm.forEach(dm -> {
            dm.setEmploye(getEmployeById(dm.getEmployeId()));
        });

        return listDm;
    }

    public Demande getDemandeById(Long id) {
        Demande dm = demandeRepository.findDemandeById(id);
        dm.setEmploye(getEmployeById(dm.getEmployeId()));
        return dm;
    }

    // ************************* POST ************************

    public void addEmpAbs(AbsenceRequest absReq){
        EmployeAbsence abs = new EmployeAbsence();
        Employe emp = employeRestClient.getEmployeById(absReq.getEmployeId());
        abs.setDateAbs(absReq.getDateAbs());
        abs.setDuree(absReq.getDuree());
        abs.setNatureAbsence(absReq.getNatureAbsence());
        abs.setEmployeId(emp.getId());
        abs.setJustificatif(absReq.isJustificatif());

        absenceRepository.save(abs);
    }

    public void addDmAbs(DemandeRequest dmReq){
        Demande dm = new Demande();

        dm.setNatureAbsence(dmReq.getNatureAbsence());
        dm.setEmployeId(dmReq.getEmployeId());
        dm.setDateDebut(dmReq.getDateDebut());
        dm.setDateFin(dmReq.getDateFin());

        demandeRepository.save(dm);
    }

    // ************************* PUT *************************
    public void updateEmpAbs(AbsenceRequest absReq, Long id){
        EmployeAbsence abs = getEmpAbsById(id);

        abs.setDateAbs(absReq.getDateAbs());
        abs.setDuree(absReq.getDuree());
        abs.setNatureAbsence(absReq.getNatureAbsence());
        abs.setEmployeId(absReq.getEmployeId());
        abs.setJustificatif(absReq.isJustificatif());

        absenceRepository.save(abs);
    }

    public void updateDm(DemandeRequest dmReq, Long id){
        Demande dm = getDemandeById(id);

        dm.setNatureAbsence(dmReq.getNatureAbsence());
        dm.setEmployeId(dmReq.getEmployeId());
        dm.setDateDebut(dmReq.getDateDebut());
        dm.setDateFin(dmReq.getDateFin());

        demandeRepository.save(dm);
    }

    // ************************* DELETE **********************

    public void deleteEmpAbs(Long id){
        absenceRepository.deleteById(id);
    }

    public void deleteDm(Long id){
        demandeRepository.deleteById(id);
    }

}
