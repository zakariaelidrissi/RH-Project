package com.RHmanagment.offre_stage.Web;

import com.RHmanagment.offre_stage.Entities.OffreStage;
import com.RHmanagment.offre_stage.Model.OffreStageRequest;
import com.RHmanagment.offre_stage.Model.OffreStageRequest;
import com.RHmanagment.offre_stage.Service.OffreStageService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @AllArgsConstructor
public class OffreStageRestController {

    private OffreStageService offrestageService;

    // ************************ GET **************************
    @GetMapping(path = "/offrestages")
    public List<OffreStage> getAllOffreStage() {
        return offrestageService.getAllOffreStage();
    }

    @GetMapping(path = "/offrestages/{id}")
    public OffreStage getOffreStageById(@PathVariable Long id){
        return offrestageService.getOffreStageById(id);
    }

    @GetMapping(path = "/offrestages/user/{id}")
    public OffreStage getOffreStageByUserId(@PathVariable Long id) {
        return offrestageService.getOffreStageByUserId(id);
    }

    // ************************ POST **************************
    @PostMapping(path = "/offrestages")
    public void addOffreStage(@RequestBody OffreStageRequest offrestgReq) {
        offrestageService.addOffreStage(offrestgReq);
    }

    // ************************ PUT **************************
    @PutMapping(path = "/offrestages")
    public void updateOffreStage(@RequestBody OffreStageRequest offrestgReq) {
        offrestageService.updateOffreStage(offrestgReq);
    }

    // ************************ DELETE **************************
    @DeleteMapping(path = "/offrestages/{id}")
    public void deleteById(@PathVariable Long id) {
        offrestageService.deleteById(id);
    }
}

