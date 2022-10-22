package com.RHmanagment.offre_stage.Service;

import com.RHmanagment.offre_stage.Entities.OffreStage;
import com.RHmanagment.offre_stage.Entities.OffreStage;
import com.RHmanagment.offre_stage.Feign.UserRestClient;
import com.RHmanagment.offre_stage.Model.OffreStageRequest;
import com.RHmanagment.offre_stage.Model.User;
import com.RHmanagment.offre_stage.Repositories.OffreStageRepository;
import com.RHmanagment.offre_stage.Repositories.OffreStageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class OffreStageService {

    private OffreStageRepository offrestageRepository;
    private UserRestClient userRestClient;

    // ************************ GET **************************
    public User getUserById(Long id) {
        return userRestClient.getUserById(id);
    }

    public List<OffreStage> getAllOffreStage() {
        List<OffreStage> listOffreStg = offrestageRepository.findAll();
        listOffreStg.forEach(offrestg -> {
            offrestg.setUser(getUserById(offrestg.getUserId()));
        });

        return listOffreStg;
    }

    public OffreStage getOffreStageById(Long id){
        OffreStage offrestg = offrestageRepository.findOffreStageById(id);
        offrestg.setUser(getUserById(offrestg.getUserId()));

        return  offrestg;
    }

    public OffreStage getOffreStageByUserId(Long id) {
        OffreStage offrestg = offrestageRepository.findOffreStageByUserId(id);
        offrestg.setUser(getUserById(offrestg.getUserId()));

        return offrestg;
    }

    // ************************ POST **************************
    public void addOffreStage(OffreStageRequest offrestgReq) {
        OffreStage offrestg = new OffreStage();

        offrestg.setIntitule(offrestgReq.getIntitule());
        offrestg.setType_stage(offrestgReq.getType_stage());
        offrestg.setDuree_stage_mois(offrestgReq.getDuree_stage_mois());
        offrestg.setDate_debut_stage(offrestgReq.getDate_debut_stage());
        offrestg.setUserId(offrestgReq.getUserId());
        offrestg.setRemuneration(offrestgReq.getRemuneration());
        offrestg.setDiplome_demande(offrestgReq.getDiplome_demande());
        offrestg.setDescriptif_mission(offrestgReq.getDescriptif_mission());

        offrestageRepository.save(offrestg);
    }

    // ************************ PUT **************************
    public void updateOffreStage(OffreStageRequest offrestgReq) {
        OffreStage offrestg = getOffreStageById(offrestgReq.getId());

        offrestg.setIntitule(offrestgReq.getIntitule());
        offrestg.setType_stage(offrestgReq.getType_stage());
        offrestg.setDuree_stage_mois(offrestgReq.getDuree_stage_mois());
        offrestg.setDate_debut_stage(offrestgReq.getDate_debut_stage());
        offrestg.setUserId(offrestgReq.getUserId());
        offrestg.setRemuneration(offrestgReq.getRemuneration());
        offrestg.setDiplome_demande(offrestgReq.getDiplome_demande());
        offrestg.setDescriptif_mission(offrestgReq.getDescriptif_mission());

        offrestageRepository.save(offrestg);
    }

    // ************************ DELETE **************************
    public void deleteById(Long id) {
        offrestageRepository.deleteById(id);
    }
}
