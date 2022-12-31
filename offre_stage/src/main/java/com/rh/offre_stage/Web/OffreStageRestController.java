package com.rh.offre_stage.Web;

import com.rh.offre_stage.Entities.OffreStage;
import com.rh.offre_stage.Model.OffreStageRequest;
import com.rh.offre_stage.Model.User;
import com.rh.offre_stage.Repositories.OffreStageRepository;
import com.rh.offre_stage.Service.OffreStageService;
import org.springframework.web.bind.annotation.*;


import java.util.List;

public class OffreStageRestController {
    private OffreStageService offreStageService;

    // ************************ GET **************************
    @GetMapping(path = "/offrestages")
    public List<OffreStage> getAllOffreStage() {
        return offreStageService.getAllOffreStage();
    }

    @GetMapping(path = "/offrestages/{id}")
    public OffreStage getOffreStageById(@PathVariable Long id){
        return offreStageService.getOffreStageById(id);
    }



    // ************************ POST **************************
    @PostMapping(path = "/offrestages")
    public void addOffreStage(@RequestBody OffreStageRequest stgReq) {
        offreStageService.addOffreStage(stgReq);
    }

    // ************************ PUT **************************
    @PutMapping(path = "/offrestages")
    public void updateOffreStage(@RequestBody OffreStageRequest stgReq) {
        offreStageService.updateOffreStage(stgReq);
    }

    // ************************ DELETE **************************
    @DeleteMapping(path = "/offrestages/{id}")
    public void deleteById(@PathVariable Long id) {
        offreStageService.deleteById(id);
    }
}


