package com.rh.stagiaire.Service;

import com.rh.stagiaire.Entities.Stagiaire;
import com.rh.stagiaire.Feign.PostulationClient;
import com.rh.stagiaire.Feign.UserClient;
import com.rh.stagiaire.Model.OffreStage;
import com.rh.stagiaire.Model.StagiareRequest;
import com.rh.stagiaire.Model.User;
import com.rh.stagiaire.Repositories.StagiaireRepository;
import lombok.AllArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@CrossOrigin("*")
@Transactional
@AllArgsConstructor
@Service
public class StagiaireService {

    private StagiaireRepository stagiaireRepository;
    private UserClient userRestClient;
    private PostulationClient postulationClient;
    JavaMailSender javaMailSender;

    // ************************ GET **************************
    public User getUserById(Long id) {
        return userRestClient.getUserById(id);
    }
    public OffreStage getOffreById(Long id) {
        return postulationClient.getOffreById(id);
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

    // **************** EMAIL **************************
    public void sendStartDateEmail(Long UserId, Long OffreId) {
        try {
            OffreStage offreStage = postulationClient.getOffreById(OffreId);
            User user = userRestClient.getUserById(UserId);
            MimeMessage msg = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg, true);
            helper.setTo(user.getEmail());
            helper.setSubject("Confirmation de votre stage");
            helper.setText("Nous sommes heureux de vous informer que votre stage commencera le " + offreStage.getDate_debut_stage() + ".");
            javaMailSender.send(msg);
        } catch (MessagingException e) {
            // Traitement des erreurs
        }
    }
}
