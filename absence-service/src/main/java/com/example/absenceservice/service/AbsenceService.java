package com.example.absenceservice.service;

import com.example.absenceservice.entities.Demande;
import com.example.absenceservice.entities.EmployeAbsence;
import com.example.absenceservice.entities.StagiaireAbsence;
import com.example.absenceservice.feign.EmployeRestClient;
import com.example.absenceservice.feign.StagiaireRestClient;
import com.example.absenceservice.model.*;
import com.example.absenceservice.repositories.AbsenceRepository;
import com.example.absenceservice.repositories.DemandeRepository;
import com.example.absenceservice.repositories.StgAbsRepository;
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
    private StagiaireRestClient stagiaireRestClient;
    private AbsenceRepository absenceRepository;
    private StgAbsRepository stgAbsRepository;
    private DemandeRepository demandeRepository;

    // ************************* GET ************************

    public Employe getEmployeById(Long id) {
        return employeRestClient.getEmployeById(id);
    }

    public Stagiaire getStgById(Long id) {
        return stagiaireRestClient.getStagiaireById(id);
    }

    public List<EmployeAbsence> getAllEmpAbs() {
        List<EmployeAbsence> listAbs = absenceRepository.findAll();

        listAbs.forEach(abs -> {
            abs.setEmploye(getEmployeById(abs.getEmployeId()));
        });

        return listAbs;
    }

    public List<StagiaireAbsence> getAllStgAbs() {
        List<StagiaireAbsence> listAbs = stgAbsRepository.findAll();

        listAbs.forEach(abs -> {
            abs.setStagiaire(getStgById(abs.getStagiaireId()));
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

    public List<StagiaireAbsence> getAllStgAbsByDate(Date date) {
        List<StagiaireAbsence> listAbs = stgAbsRepository.findStagiaireAbsenceByDateAbs(date);

        listAbs.forEach(abs -> {
            abs.setStagiaire(getStgById(abs.getStagiaireId()));
        });

        return listAbs;
    }

    public EmployeAbsence getEmpAbsById(Long id) {
        EmployeAbsence abs = absenceRepository.findEmployeAbsenceById(id);
        abs.setEmploye(getEmployeById(abs.getEmployeId()));
        return abs;
    }

    public StagiaireAbsence getStgAbsById(Long id) {
        StagiaireAbsence abs = stgAbsRepository.findStagiaireAbsenceById(id);
        abs.setStagiaire(getStgById(abs.getStagiaireId()));
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
        abs.setDateAbs(absReq.getDateAbs());
        abs.setDuree(absReq.getDuree());
        abs.setNatureAbsence(absReq.getNatureAbsence());
        abs.setEmployeId(absReq.getEmployeId());
        abs.setJustificatif(absReq.isJustificatif());

        absenceRepository.save(abs);
    }

    public void addStgAbs(StagiaireRequest stgReq){
        StagiaireAbsence abs = new StagiaireAbsence();
        abs.setDateAbs(stgReq.getDateAbs());
        abs.setNatureAbsence(stgReq.getNatureAbsence());
        abs.setDuree(stgReq.getDuree());
        abs.setJustificatif(stgReq.isJustificatif());
        abs.setStagiaireId(stgReq.getStagiaireId());

        stgAbsRepository.save(abs);
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
    public void updateEmpAbs(AbsenceRequest absReq){
        EmployeAbsence abs = getEmpAbsById(absReq.getId());

        abs.setDateAbs(absReq.getDateAbs());
        abs.setDuree(absReq.getDuree());
        abs.setNatureAbsence(absReq.getNatureAbsence());
        abs.setEmployeId(absReq.getEmployeId());
        abs.setJustificatif(absReq.isJustificatif());

        absenceRepository.save(abs);
    }

    public void updateStgAbs(StagiaireRequest stgReq){
        StagiaireAbsence abs = getStgAbsById(stgReq.getId());
        abs.setDateAbs(stgReq.getDateAbs());
        abs.setNatureAbsence(stgReq.getNatureAbsence());
        abs.setDuree(stgReq.getDuree());
        abs.setJustificatif(stgReq.isJustificatif());
        abs.setStagiaireId(stgReq.getStagiaireId());

        stgAbsRepository.save(abs);
    }

    public void updateDm(DemandeRequest dmReq){
        Demande dm = getDemandeById(dmReq.getId());

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

    public void deleteStgAbs(Long id) {
        stgAbsRepository.deleteById(id);
    }

    public void deleteDm(Long id){
        demandeRepository.deleteById(id);
    }

}
