package com.example.absenceservice.web;

import com.example.absenceservice.entities.EmployeAbsence;
import com.example.absenceservice.entities.DemandeAbsence;
import com.example.absenceservice.entities.StagiaireAbsence;
import com.example.absenceservice.model.*;
import com.example.absenceservice.service.AbsenceService;
import com.netflix.servo.util.ThreadCpuStats;
import lombok.AllArgsConstructor;
import org.apache.commons.lang.ArrayUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin("*")
public class AbsenceController {

    private AbsenceService absenceService;

    // TODO : ************************* GET ************************

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
    public List<Absence> getAllAbsByDate(@PathVariable String date){
        Date dt = new Date(date);
        return absenceService.getAllEmpAbsByDate(dt);
    }

    @GetMapping(path = "/absencesStg/date/{date}")
    public List<Absence> getAllStgAbsByDate(@PathVariable String date){
        Date dt = new Date(date);
        return absenceService.getAllStgAbsByDate(dt);
    }

    @GetMapping(path = "/absences/{id}")
    public List<EmployeAbsence> getEmpAbsById(@PathVariable Long id){
        return absenceService.getEmpAbsById(id);
    }

    @GetMapping(path = "/absences/stg/{id}")
    public List<StagiaireAbsence> getStgAbsById(@PathVariable Long id) {
        return absenceService.getStgAbsById(id);
    }

    @GetMapping(path = "/demandes")
    public List<DemandeAbsence> getAllDemandes(){
        return absenceService.getAllDemandes();
    }

    @GetMapping(path = "/demandes/{id}")
    public DemandeAbsence getDemande(@PathVariable Long id){
        return absenceService.getDemandeById(id);
    }

    @GetMapping(path = "/demandes/byEmpId/{idEmp}")
    public List<EmpAbsRequest> getAllEmpAbsById(@PathVariable Long idEmp){
        return absenceService.getAllEmpAbsById(idEmp);
    }

    @GetMapping(path = "/demandes/abs/{empid}")
    public List<DemandeAbsence> getAllDemandeById(@PathVariable Long empid){
        return absenceService.getDemandeByEmpId(empid);
    }

    // TODO : ************************* POST ************************

    @PostMapping(path = "/absences")
    public void saveEmpAbs(@RequestBody EmpAbsRequest absReq){
        absenceService.addEmpAbs(absReq);
    }

    @PostMapping(path = "/absences/stg")
    public void saveStgAbs(@RequestBody StgAbsRequest stgReq) {
        absenceService.addStgAbs(stgReq);
    }

    @PostMapping(path = "/demandes/upload-justficatif")
    public DemandeAbsence uploadJustficatif(@RequestParam("just")MultipartFile c,@RequestParam("demId") Long demId) throws IOException {
        System.out.println("-----------------");
        System.out.println(demId);
        return absenceService.uploadJustficatif(c.getBytes(),demId);
    }
    @PostMapping(path = "/demandes")
    public DemandeAbsence saveDm(@RequestBody DemandeRequest dmReq) throws IOException {
        System.out.println("-----------------");
        System.out.println(dmReq);
        return absenceService.addDmAbs(dmReq);
    }

    // TODO : ************************* PUT *************************

    @PutMapping(path = "/demandes")
    public void updateDm(@RequestBody DemandeRequest dmres) { absenceService.updateDm(dmres); }

    /*@PutMapping(path = "/absences")
    public void updateEmpAbs(@RequestBody EmpAbsRequest absReq){
        absenceService.updateEmpAbs(absReq);
    }*/

    /*@PutMapping(path = "/absences/stg")
    public void updateStgAbs(@RequestBody StgAbsRequest stgReq) {
        absenceService.updateStgAbs(stgReq);
    }*/

    /*@PutMapping(path = "/demandes")
    public void updateDm(@RequestBody DemandeRequest dmReq){
        absenceService.updateDm(dmReq);
    }*/

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

    @GetMapping(path="/demandes/download/{id}/{filename}")
    @ResponseBody
    public ResponseEntity<byte[]> downloadFile(@PathVariable Long id) throws IOException {
        byte[] array = ArrayUtils.toPrimitive(absenceService.downloadJustificatif(id));
        return ResponseEntity
                .ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
//                .headers(headers)
                .body(array);
    }


}
