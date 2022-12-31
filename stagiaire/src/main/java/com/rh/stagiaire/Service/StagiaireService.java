package com.rh.stagiaire.Service;

import com.rh.stagiaire.Entities.Stagiaire;
import com.rh.stagiaire.Feign.UserClient;
import com.rh.stagiaire.Model.StagiareRequest;
import com.rh.stagiaire.Model.User;
import com.rh.stagiaire.Repositories.StagiaireRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.transaction.Transactional;
import java.util.List;

@CrossOrigin("*")
@Transactional
@AllArgsConstructor
@Service
public class StagiaireService {

    private StagiaireRepository stagiaireRepository;
    private UserClient userRestClient;

    // ************************ GET **************************
    public User getUserById(Long id) {
        System.out.println("id");
        System.out.println(id);
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
    public void addStagiaire(StagiareRequest stgReq) {
        Stagiaire stg = new Stagiaire();

        stg.setCivilite(stgReq.getCivilite());
        stg.setCv(stgReq.getCv());
        stg.setNiveau_etudes(stgReq.getNiveau_etudes());
        stg.setUserId(stgReq.getUserId());
        stg.setLinkedIn_URL(stgReq.getLinkedIn_URL());
        stg.setVille(stgReq.getVille());

        stagiaireRepository.save(stg);
    }

    // ************************ PUT **************************
    public void updateStagiaire(StagiareRequest stgReq) {
        Stagiaire stg = getStagiaireById(stgReq.getId());

        stg.setCivilite(stgReq.getCivilite());
        stg.setCv(stgReq.getCv());
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
