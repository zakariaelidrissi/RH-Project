package com.rh.offre_stage.Service;

import com.rh.offre_stage.Entities.OffreStage;
import com.rh.offre_stage.Feign.UserClient;
import com.rh.offre_stage.Model.OffreStageRequest;
import com.rh.offre_stage.Model.User;
import com.rh.offre_stage.Repositories.OffreStageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("*")
@Service
@AllArgsConstructor
public class OffreStageService {
    private OffreStageRepository offreStageRepository;
    private UserClient userRestClient;

    // ************************ GET **************************
    public User getUserById(Long id) {
        return userRestClient.getUserById(id);
    }

    public List<OffreStage> getAllOffreStage() {
        List<OffreStage> listStg = offreStageRepository.findAll();
        return listStg;
    }

    public OffreStage getOffreStageById(Long id){
        OffreStage stg = offreStageRepository.findOffreStageById(id);
        stg.setId(stg.getId());
        return  stg;
    }


    // ************************ POST **************************
    public void addOffreStage(OffreStageRequest stgReq) {
        OffreStage stg = new OffreStage();

        stg.setIntitule(stgReq.getIntitule());
        stg.setType_stage(stgReq.getType_stage());
        stg.setDuree_stage_mois(stgReq.getDuree_stage_mois());
        stg.setDate_debut_stage(stgReq.getDate_debut_stage());
        stg.setRemuneration(stgReq.getRemuneration());
        stg.setDiplome_demande(stgReq.getDiplome_demande());
        stg.setDescriptif_mission(stgReq.getDescriptif_mission());

        offreStageRepository.save(stg);
    }

    // ************************ PUT **************************
    public void updateOffreStage(OffreStageRequest stgReq) {
        OffreStage stg = getOffreStageById(stgReq.getId());

        stg.setIntitule(stgReq.getIntitule());
        stg.setType_stage(stgReq.getType_stage());
        stg.setDuree_stage_mois(stgReq.getDuree_stage_mois());
        stg.setDate_debut_stage(stgReq.getDate_debut_stage());
        stg.setRemuneration(stgReq.getRemuneration());
        stg.setDiplome_demande(stgReq.getDiplome_demande());
        stg.setDescriptif_mission(stgReq.getDescriptif_mission());

        offreStageRepository.save(stg);
    }

    // ************************ DELETE **************************
    public void deleteById(Long id) {
        offreStageRepository.deleteById(id);
    }
}
