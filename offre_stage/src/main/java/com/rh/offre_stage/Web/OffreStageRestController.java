package com.rh.offre_stage.Web;

import com.rh.offre_stage.Entities.OffreStage;
import com.rh.offre_stage.Model.OffreStageRequest;
import com.rh.offre_stage.Model.User;
import com.rh.offre_stage.Repositories.OffreStageRepository;
import com.rh.offre_stage.Service.OffreStageService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@AllArgsConstructor
@RestController
public class OffreStageRestController {
    private OffreStageService offreStageService;

    // ************************ GET **************************
    @GetMapping(path = "/offre/stages")
    public List<OffreStage> getAllOffreStage() {
        return offreStageService.getAllOffreStage();
    }

    @GetMapping(path = "/offre/stages/{id}")
    public OffreStage getOffreStageById(@PathVariable Long id){
        return offreStageService.getOffreStageById(id);
    }



    // ************************ POST **************************
    @PostMapping(path = "/offre/stages")
    public void addOffreStage(@RequestBody OffreStageRequest stgReq) {
        offreStageService.addOffreStage(stgReq);
    }

    // ************************ PUT **************************
    @PutMapping(path = "/offre/stages")
    public void updateOffreStage(@RequestBody OffreStageRequest stgReq) {
        offreStageService.updateOffreStage(stgReq);
    }

    // ************************ DELETE **************************
    @DeleteMapping(path = "/offre/stages/{id}")
    public void deleteById(@PathVariable Long id) {
        offreStageService.deleteById(id);
    }
}


