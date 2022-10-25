package com.rh.stagiaire.Web;

import com.rh.stagiaire.Entities.Stagiaire;
import com.rh.stagiaire.Model.StagiareRequest;
import com.rh.stagiaire.Service.StagiaireService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @AllArgsConstructor
public class StagiaireRestController {

    private StagiaireService stagiaireService;

    // ************************ GET **************************
    @GetMapping(path = "/stagiaires")
    public List<Stagiaire> getAllStagiaire() {
        return stagiaireService.getAllStagiaire();
    }

    @GetMapping(path = "/stagiaires/{id}")
    public Stagiaire getStagiaireById(@PathVariable Long id){
        return stagiaireService.getStagiaireById(id);
    }

    @GetMapping(path = "/stagiaires/user/{id}")
    public Stagiaire getStagiaireByUserId(@PathVariable Long id) {
        return stagiaireService.getStagiaireByUserId(id);
    }

    // ************************ POST **************************
    @PostMapping(path = "/stagiaires")
    public void addStagiaire(@RequestBody StagiareRequest stgReq) {
        stagiaireService.addStagiaire(stgReq);
    }

    // ************************ PUT **************************
    @PutMapping(path = "/stagiaires")
    public void updateStagiaire(@RequestBody StagiareRequest stgReq) {
        stagiaireService.updateStagiaire(stgReq);
    }

    // ************************ DELETE **************************
    @DeleteMapping(path = "/stagiaires/{id}")
    public void deleteById(@PathVariable Long id) {
        stagiaireService.deleteById(id);
    }
}
