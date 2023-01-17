package com.example.absenceservice.service;

import com.example.absenceservice.entities.DemandeAbsence;
import com.example.absenceservice.entities.EmployeAbsence;
import com.example.absenceservice.entities.StagiaireAbsence;
import com.example.absenceservice.feign.EmployeRestClient;
import com.example.absenceservice.feign.StagiaireRestClient;
import com.example.absenceservice.model.*;
import com.example.absenceservice.repositories.EmpAbsRepository;
import com.example.absenceservice.repositories.DemandeRepository;
import com.example.absenceservice.repositories.StgAbsRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class AbsenceService {

    private EmployeRestClient employeRestClient;
    private StagiaireRestClient stagiaireRestClient;
    private EmpAbsRepository absenceRepository;
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

    public List<EmpAbsRequest> getAllEmpAbsById(Long idEmp){
        List<EmployeAbsence> absences = absenceRepository.findAll();
        List<EmpAbsRequest> abs = new ArrayList<>();

        absences.forEach(absence -> {
            if (absence.getEmployeId().equals(idEmp)){
                abs.add(new EmpAbsRequest(absence.getId(), absence.getDateAbs(), absence.getNatureAbsence(), absence.getJustificatif(),
                        absence.getDuree(), absence.getEmployeId()));
            }
        });

        return abs;
    }

    public List<StagiaireAbsence> getAllStgAbs() {
        List<StagiaireAbsence> listAbs = stgAbsRepository.findAll();

        listAbs.forEach(abs -> {
            abs.setStagiaire(getStgById(abs.getStagiaireId()));
        });

        return listAbs;
    }

    public List<Absence> getAllEmpAbsByDate(Date date) {
        List<EmployeAbsence> listAbs = absenceRepository.findAllEmployeAbsenceByDateAbs(date);
        List<Employe> allEmp = employeRestClient.getAllEmp();
        List<Absence> allAbs = new ArrayList<>();
        System.out.println(date);
        for (Employe emp : allEmp) {
            int count = 0;
            for (EmployeAbsence abs : listAbs) {
                if (emp.getId().equals(abs.getEmployeId())){
                    allAbs.add(new Absence(abs.getId(),abs.getDateAbs(),abs.getNatureAbsence(),
                            abs.getJustificatif(),abs.getDuree(),"yes",emp.getId(),emp.getUser().getNom()));
                    count++;
                    break;
                }
            }
            if (count == 0 ){
                allAbs.add(new Absence(null,null,null,
                        null,null,"no", emp.getId(),emp.getUser().getNom()));
            }
        }

        return allAbs;
    }

    public List<Absence> getAllStgAbsByDate(Date date) {
        List<StagiaireAbsence> listAbs = stgAbsRepository.findAllStagiaireAbsenceByDateAbs(date);
        List<Stagiaire> allStg = stagiaireRestClient.getAllStg();
        List<Absence> allAbs = new ArrayList<>();

        listAbs.forEach(abs -> {
            abs.setStagiaire(getStgById(abs.getStagiaireId()));
        });

        System.out.println(date);
        for (Stagiaire stg : allStg) {
            int count = 0;
            for (StagiaireAbsence abs : listAbs) {
                if (stg.getId().equals(abs.getStagiaireId())){
                    allAbs.add(new Absence(abs.getId(),abs.getDateAbs(),abs.getNatureAbsence(),
                            abs.getJustificatif(),abs.getDuree(),"yes",stg.getId(),stg.getUser().getNom()));
                    count++;
                    break;
                }
            }
            if (count == 0 ){
                allAbs.add(new Absence(null,null,null,
                        null,null,"no", stg.getId(),stg.getUser().getNom()));
            }
        }

        return allAbs;
    }

    public List<EmployeAbsence> getEmpAbsById(Long id) {
        List<EmployeAbsence> abs = absenceRepository.findAllEmployeAbsenceByEmployeId(id);
        abs.forEach(a -> {
                a.setEmploye(getEmployeById(a.getEmployeId()));
        });
        return abs;
    }

    public List<StagiaireAbsence> getStgAbsById(Long id) {
        List<StagiaireAbsence> abs = stgAbsRepository.findAllStagiaireAbsenceByStagiaireId(id);
        abs.forEach(a -> {
            a.setStagiaire(getStgById(a.getStagiaireId()));
        });
        return abs;
    }

    public List<DemandeAbsence> getAllDemandes() {
        List<DemandeAbsence> listDm = demandeRepository.findAll();

        listDm.forEach(dm -> {
            dm.setEmploye(getEmployeById(dm.getEmployeId()));
        });

        return listDm;
    }

    public DemandeAbsence getDemandeById(Long id) {
        DemandeAbsence dm = demandeRepository.findDemandeById(id);
        dm.setEmploye(getEmployeById(dm.getEmployeId()));
        return dm;
    }

    public List<DemandeAbsence> getDemandeByEmpId(Long id) {
        List<DemandeAbsence> listDm = demandeRepository.findAllByEmployeId(id);
        listDm.forEach(dm -> {
            dm.setEmploye(getEmployeById(dm.getEmployeId()));
        });

        return listDm;
    }

    // ************************* POST ************************

    public void addEmpAbs(EmpAbsRequest absReq){
        EmployeAbsence abs = new EmployeAbsence();
        abs.setDateAbs(absReq.getDateAbs());
        abs.setDuree(absReq.getDuree());
        abs.setNatureAbsence(absReq.getNatureAbsence());
        abs.setEmployeId(absReq.getEmployeId());
        abs.setJustificatif(absReq.getJustificatif());


        absenceRepository.save(abs);
    }

    public void addStgAbs(StgAbsRequest stgReq){
        StagiaireAbsence abs = new StagiaireAbsence();
        abs.setDateAbs(stgReq.getDateAbs());
        abs.setNatureAbsence(stgReq.getNatureAbsence());
        abs.setDuree(stgReq.getDuree());
        abs.setJustificatif(stgReq.getJustificatif());
        abs.setStagiaireId(stgReq.getStagiaireId());

        stgAbsRepository.save(abs);
    }

    public DemandeAbsence addDmAbs(DemandeRequest dmReq){
        DemandeAbsence dm = new DemandeAbsence();

        dm.setNatureAbsence(dmReq.getNatureAbsence());
        dm.setEmployeId(dmReq.getEmployeId());
        dm.setDateDebut(dmReq.getDateDebut());
        dm.setJustificatif(dmReq.getJustificatif());
        dm.setDateFin(dmReq.getDateFin());
        dm.setStatut(dmReq.getStatut());
        dm.setJustificatifFilename(dmReq.getJustificatifFilename());

        return demandeRepository.save(dm);
    }

    // ************************* PUT *************************
    /*public void updateEmpAbs(EmpAbsRequest absReq){
        EmployeAbsence abs = getEmpAbsById(absReq.getId());

        abs.setDateAbs(absReq.getDateAbs());
        abs.setDuree(absReq.getDuree());
        abs.setNatureAbsence(absReq.getNatureAbsence());
        abs.setEmployeId(absReq.getEmployeId());
        abs.setJustificatif(absReq.getJustificatif());

        absenceRepository.save(abs);
    }*/

    /*public void updateStgAbs(StgAbsRequest stgReq){
        StagiaireAbsence abs = getStgAbsById(stgReq.getId());
        abs.setDateAbs(stgReq.getDateAbs());
        abs.setNatureAbsence(stgReq.getNatureAbsence());
        abs.setDuree(stgReq.getDuree());
        abs.setJustificatif(stgReq.getJustificatif());
        abs.setStagiaireId(stgReq.getStagiaireId());

        stgAbsRepository.save(abs);
    }

    public void updateDm(DemandeRequest dmReq){
        DemandeAbsence dm = getDemandeById(dmReq.getId());

        dm.setNatureAbsence(dmReq.getNatureAbsence());
        dm.setEmployeId(dmReq.getEmployeId());
        dm.setDateDebut(dmReq.getDateDebut());
        dm.setJustificatif(dmReq.getJustificatif());
        dm.setDateFin(dmReq.getDateFin());
        dm.setStatut(dmReq.getStatut());

        demandeRepository.save(dm);
    }*/

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

    public void updateDm(DemandeRequest dmres) {
        DemandeAbsence dm = demandeRepository.findDemandeById(dmres.getId());
        dm.setStatut(dmres.getStatut());

        demandeRepository.save(dm);
    }

    public DemandeAbsence uploadJustficatif(byte[] bytes,Long id) {
        DemandeAbsence d = demandeRepository.findById(id).get();
        d.setJustificatif(bytes);
        return demandeRepository.save(d);
    }

    public Byte[] downloadJustificatif(Long id) {
        return demandeRepository.loadFile(id);
    }
}
