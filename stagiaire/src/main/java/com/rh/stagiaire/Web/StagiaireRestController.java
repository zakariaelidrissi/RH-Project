package com.rh.stagiaire.Web;

import com.rh.stagiaire.Entities.Stagiaire;
import com.rh.stagiaire.Feign.PostulationClient;
import com.rh.stagiaire.Feign.UserClient;
import com.rh.stagiaire.Model.OffreStage;
import com.rh.stagiaire.Model.StagiareRequest;
import com.rh.stagiaire.Model.User;
import com.rh.stagiaire.Repositories.StagiaireRepository;
import com.rh.stagiaire.Service.StagiaireService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;

@CrossOrigin("*")
@RestController @AllArgsConstructor
public class StagiaireRestController {

    private StagiaireService stagiaireService;
    private StagiaireRepository stagiaireRepository;
    private UserClient userRestClient;
    private PostulationClient postulationClient;

    // TODO : ************************ GET **************************
    @GetMapping(path = "/stagiaires")
    public List<Stagiaire> getAllStagiaire() {
        return stagiaireService.getAllStagiaire();
    }

    @GetMapping(path = "/stagiaires/{id}")
    public Stagiaire getStagiaireById(@PathVariable Long id){
        return stagiaireService.getStagiaireById(id);
    }

    @GetMapping(path = "/stagiaires/user/{id}")
    public Stagiaire getStagiaireByUserId(@PathVariable Long id) {
        return stagiaireService.getStagiaireByUserId(id);
    }

    // TODO : ************************ POST **************************
    @PostMapping(path = "/stagiaires")
    public void addStagiaire(@RequestBody StagiareRequest stgReq) {
        stagiaireService.addStagiaire(stgReq);
    }

    // TODO : ************************ PUT **************************
    @PutMapping(path = "/stagiaires")
    public void updateStagiaire(@RequestBody StagiareRequest stgReq) {
        stagiaireService.updateStagiaire(stgReq);
    }

    // TODO : ************************ DELETE **************************
    @DeleteMapping(path = "/stagiaires/{id}")
    public void deleteById(@PathVariable Long id) {
        stagiaireService.deleteById(id);
    }

    //***  Ajouter les stagiaires ayant réussis l’entretien, et leurs envoyés un mail qui leur informe de la date de début de stage ***
    @PostMapping("/add_successful_applicant")
    public void addSuccessfulApplicant(StagiareRequest stgReq, OffreStage offre) {
        try {
            OffreStage offreStage = postulationClient.getOffreById(offre.getId());
            User user = userRestClient.getUserById(stgReq.getUserId());

            Stagiaire stg = new Stagiaire();

            stg.setCivilite(stgReq.getCivilite());
            stg.setNiveau_etudes(stgReq.getNiveau_etudes());
            stg.setUserId(stgReq.getUserId());
            stg.setLinkedIn_URL(stgReq.getLinkedIn_URL());
            stg.setVille(stgReq.getVille());

            stagiaireRepository.save(stg);

            // Envoyer un email de confirmation
            stagiaireService.sendStartDateEmail(user.getId(),offreStage.getId());
        } catch (DateTimeParseException e) {
            // Traitement des erreurs
        }
    }
    @PostMapping("/upload-cv")
    public Stagiaire uploadCV(@RequestParam("file") MultipartFile file, @RequestParam("sid") Long sid) throws IOException {
        // Récupération du nom de fichier
        String fileName = file.getOriginalFilename();
        return stagiaireService.uploadCV(file.getBytes(),sid);
    }






}
