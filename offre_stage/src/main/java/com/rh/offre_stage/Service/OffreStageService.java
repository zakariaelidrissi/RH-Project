package com.rh.offre_stage.Service;

import com.rh.offre_stage.Entities.OffreStage;
import com.rh.offre_stage.Entities.Postulation;
import com.rh.offre_stage.Feign.UserClient;
import com.rh.offre_stage.Model.OffreStageRequest;
import com.rh.offre_stage.Model.PostulationRequest;
import com.rh.offre_stage.Model.User;
import com.rh.offre_stage.Repositories.OffreStageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.rh.offre_stage.Repositories.PostulationRepository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

//@CrossOrigin("*")
@Service
@Transactional
@AllArgsConstructor
public class OffreStageService {

    private OffreStageRepository offreStageRepository;
    private PostulationRepository postulationRepository;
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
        //stg.setId(stg.getId());
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
    // ************************* P O S T U L E R *******************
    public List<Postulation> getAllPostulations() {
        List<Postulation> listP = postulationRepository.findAll();
        listP.forEach(po -> {
            po.setUser(userRestClient.getUserById(po.getUserId()));
            po.setOffreStage(offreStageRepository.findOffreStageById(po.getOffreStageId()));
        });
        return listP;
    }

    public void Postuler(PostulationRequest req) {
        Postulation po = new Postulation();

        po.setOffreStageId(req.getOffreStageId());
        po.setUserId(req.getUserId());
        po.setPostulationDate(new Date());

        postulationRepository.save(po);
    }

    public Postulation getPostulationById (Long id){
        Postulation po = postulationRepository.findPostulationById(id);
        po.setUser(userRestClient.getUserById(po.getUserId()));
        return  po;
    }
    public void updatePostulation(PostulationRequest PReq) {
        Postulation P = getPostulationById(PReq.getId());

        P.setStatut(PReq.getStatut());

        postulationRepository.save(P);
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
