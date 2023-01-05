package com.rh.offre_stage.Web;

import com.rh.offre_stage.Entities.OffreStage;
import com.rh.offre_stage.Entities.Postulation;
import com.rh.offre_stage.Model.OffreStageRequest;
import com.rh.offre_stage.Model.PostulationRequest;
import com.rh.offre_stage.Model.User;
import com.rh.offre_stage.Repositories.OffreStageRepository;
import com.rh.offre_stage.Service.OffreStageService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController @AllArgsConstructor
@CrossOrigin("*")
public class OffreStageRestController {
    private OffreStageService offreStageService;

    // ************************ GET **************************
    @GetMapping(path = "/offreStages")
    public List<OffreStage> getAllOffreStage() {

        return offreStageService.getAllOffreStage();
    }

    @GetMapping(path = "/offreStages/{id}")
    public OffreStage getOffreStageById(@PathVariable Long id){

        return offreStageService.getOffreStageById(id);
    }

    //************************* Postuler **********************
    @GetMapping(path = "/postulations")
    public List<Postulation> getAllPostulations() {

        return offreStageService.getAllPostulations();
    }

    @GetMapping(path = "/postulation/{id}")
    public Postulation getPostulationById(@PathVariable Long id){

        return offreStageService.getPostulationById(id);
    }

    @PostMapping(path = "/postulations")
    public void addPostulation(@RequestBody PostulationRequest PReq) {

        offreStageService.Postuler(PReq);
    }

    // ************************ POST **************************
    @PostMapping(path = "/offreStages")
    public void addOffreStage(@RequestBody OffreStageRequest stgReq) {

        offreStageService.addOffreStage(stgReq);
    }

    // ************************ PUT **************************
    @PutMapping(path = "/offreStages")
    public void updateOffreStage(@RequestBody OffreStageRequest stgReq) {

        offreStageService.updateOffreStage(stgReq);
    }

    // ************************ DELETE **************************
    @DeleteMapping(path = "/offreStages/{id}")
    public void deleteById(@PathVariable Long id) {

        offreStageService.deleteById(id);
    }
}


