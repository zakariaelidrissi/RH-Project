package com.rh.offre_stage.Service;

import com.rh.offre_stage.Entities.OffreStage;
import com.rh.offre_stage.Feign.UserClient;
import com.rh.offre_stage.Model.User;
import com.rh.offre_stage.Repositories.OffreStageRepository;

import java.util.List;

public class OffreStageService {
    private OffreStageRepository offreStageRepository;
    private UserClient userRestClient;

    // ************************ GET **************************
    public User getUserById(Long id) {
        return userRestClient.getUserById(id);
    }

    public List<OffreStage> getAllOffreStage() {
        List<OffreStage> listStg = offreStageRepository.findAll();
        listStg.forEach(stg -> {
            stg.setId(getUserById(stg.getId()));
        });

        return listStg;
    }

    public OffreStage getOffreStageById(Long id){
        OffreStage stg = offreStageRepository.findOffreStageById(id);
        stg.setUser(getUserById(stg.getUserId()));

        return  stg;
    }

    public OffreStage getOffreStageByUserId(Long id) {
        OffreStage stg = offreStageRepository.findOffreStageByUserId(id);
        stg.setUser(getUserById(stg.getUserId()));

        return stg;
    }

    // ************************ POST **************************
    public void addOffreStage(StagiareRequest stgReq) {
        OffreStage stg = new OffreStage();

        stg.setCivilite(stgReq.getCivilite());
        stg.setCv(stgReq.getCv());
        stg.setNiveau_etudes(stgReq.getNiveau_etudes());
        stg.setUserId(stgReq.getUserId());
        stg.setLinkedIn_URL(stgReq.getLinkedIn_URL());
        stg.setVille(stgReq.getVille());

        offreStageRepository.save(stg);
    }

    // ************************ PUT **************************
    public void updateOffreStage(StagiareRequest stgReq) {
        OffreStage stg = getOffreStageById(stgReq.getId());

        stg.setCivilite(stgReq.getCivilite());
        stg.setCv(stgReq.getCv());
        stg.setNiveau_etudes(stgReq.getNiveau_etudes());
        stg.setUserId(stgReq.getUserId());
        stg.setLinkedIn_URL(stgReq.getLinkedIn_URL());
        stg.setVille(stgReq.getVille());

        offreStageRepository.save(stg);
    }

    // ************************ DELETE **************************
    public void deleteById(Long id) {
        offreStageRepository.deleteById(id);
    }
}
