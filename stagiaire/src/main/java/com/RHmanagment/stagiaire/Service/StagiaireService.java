package com.RHmanagment.stagiaire.Service;

import com.RHmanagment.stagiaire.Entities.Stagiaire;
import com.RHmanagment.stagiaire.Feign.UserRestClient;
import com.RHmanagment.stagiaire.Model.StagiaireRequest;
import com.RHmanagment.stagiaire.Model.User;
import com.RHmanagment.stagiaire.Repositories.StagiaireRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class StagiaireService {

    private StagiaireRepository stagiaireRepository;
    private UserRestClient userRestClient;

    // ************************ GET **************************
    public User getUserById(Long id) {
        return userRestClient.getUserById(id);
    }

    public List<Stagiaire> getAllStagiaire() {
        List<Stagiaire> listStg = stagiaireRepository.findAll();
        listStg.forEach(stg -> {
            stg.setUser(getUserById(stg.getUserId()));
        });

        return listStg;
    }

    public Stagiaire getStagiaireById(Long id){
        Stagiaire stg = stagiaireRepository.findStagiaireById(id);
        stg.setUser(getUserById(stg.getUserId()));

        return  stg;
    }

    public Stagiaire getStagiaireByUserId(Long id) {
        Stagiaire stg = stagiaireRepository.findStagiaireByUserId(id);
        stg.setUser(getUserById(stg.getUserId()));

        return stg;
    }

    // ************************ POST **************************
    public void addStagiaire(StagiaireRequest stgReq) {
        Stagiaire stg = new Stagiaire();

        stg.setCivilite(stgReq.getCivilite());
        stg.setCv(stgReq.getCv());
        stg.setTelephone(stgReq.getTelephone());
        stg.setNiveau_etudes(stgReq.getNiveau_etudes());
        stg.setUserId(stgReq.getUserId());
        stg.setLinkedIn_URL(stgReq.getLinkedIn_URL());
        stg.setVille(stgReq.getVille());

        stagiaireRepository.save(stg);
    }

    // ************************ PUT **************************
    public void updateStagiaire(StagiaireRequest stgReq) {
        Stagiaire stg = getStagiaireById(stgReq.getId());

        stg.setCivilite(stgReq.getCivilite());
        stg.setCv(stgReq.getCv());
        stg.setTelephone(stgReq.getTelephone());
        stg.setNiveau_etudes(stgReq.getNiveau_etudes());
        stg.setUserId(stgReq.getUserId());
        stg.setLinkedIn_URL(stgReq.getLinkedIn_URL());
        stg.setVille(stgReq.getVille());

        stagiaireRepository.save(stg);
    }

    // ************************ DELETE **************************
    public void deleteById(Long id) {
        stagiaireRepository.deleteById(id);
    }
}
