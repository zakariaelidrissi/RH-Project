package com.rh.offre_stage.Web;

import com.rh.offre_stage.Entities.OffreStage;
import com.rh.offre_stage.Entities.Postulation;
import com.rh.offre_stage.Model.OffreStageRequest;
import com.rh.offre_stage.Model.PostulationRequest;
import com.rh.offre_stage.Service.OffreStageService;
import lombok.AllArgsConstructor;
import org.springframework.mail.javamail.*;
import org.springframework.web.bind.annotation.*;


import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController @AllArgsConstructor
@CrossOrigin("*")
public class OffreStageRestController {
    private OffreStageService offreStageService;
    private JavaMailSender javaMailSender;
    private HttpServletRequest request;

    // TODO : ************************ GET **************************

    @GetMapping(path = "/offre/stages")
    public List<OffreStage> getAllOffreStage() {

        return offreStageService.getAllOffreStage();
    }


    @GetMapping(path = "/offre/stages/{id}")
    public OffreStage getOffreStageById(@PathVariable Long id){

        return offreStageService.getOffreStageById(id);
    }

    // TODO : ************************ POST **************************
    @PostMapping(path = "/offre/stages")
    public void addOffreStage(@RequestBody OffreStageRequest stgReq) {

        offreStageService.addOffreStage(stgReq);
    }

    // TODO : ************************ PUT **************************
    @PutMapping(path = "/offre/stages")
    public void updateOffreStage(@RequestBody OffreStageRequest stgReq) {

        offreStageService.updateOffreStage(stgReq);
    }

    // TODO : ************************ DELETE **************************
    @DeleteMapping(path = "/offre/stages/{id}")
    public void deleteById(@PathVariable Long id) {

        offreStageService.deleteById(id);
    }

    // TODO : ************************* Postuler **********************
    @GetMapping(path = "/postulations")
    public List<Postulation> getAllPostulations() {

        return offreStageService.getAllPostulations();
    }

    @GetMapping(path = "/postulations/{id}")
    public Postulation getPostulationById(@PathVariable Long id){

        return offreStageService.getPostulationById(id);
    }

    @PostMapping(path = "/postulations")
    public void addPostulation(@RequestBody PostulationRequest PReq) {

        offreStageService.Postuler(PReq);
    }

    // TODO : ************************ E m a i l *************************
    @PostMapping("/acceptRejectMail")
    public void acceptOrRejectApplication(@RequestParam("status") String status, @RequestParam("email") String email) {
        // Code pour enregistrer le statut de la demande de stage (Accepté ou Refusé)

        try {
            MimeMessage msg = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg, true);
            helper.setTo(email);
            if (status.equals("accepted")) {
                helper.setSubject("Acceptation de votre demande de stage");
                helper.setText("Nous sommes heureux de vous informer que votre demande de stage a été acceptée.");
            } else {
                helper.setSubject("Refus de votre demande de stage");
                helper.setText("Nous sommes désolés de vous informer que votre demande de stage a été refusée.");
            }
            javaMailSender.send(msg);
        } catch (MessagingException e) {
            // Traitement des erreurs
        }
    }
    // TODO : ******************* Mail de Confirmation ******************
    @PostMapping("/sendConfirmationMail")
    public void sendConfirmationEmail(@RequestParam("email") String email) {
        try {
            MimeMessage msg = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg, true);
            helper.setTo(email);
            helper.setSubject("Confirmation de votre candidature");

            // Générer le lien de confirmation de présence
            String confirmationUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + "/confirm_attendance?token=098765432165432178900987654321MLKJHGFDSQ1234567890NBVCXW0987654321POIUYTREZA";

            // Ajoutez le lien de confirmation de présence au contenu de l'email
            String message = "Veuillez cliquer sur ce lien pour confirmer votre présence à l'entretien : " + confirmationUrl;
            helper.setText(message, true);

            javaMailSender.send(msg);
        } catch (MessagingException e) {
            // Traitement des erreurs
        }
    }

}


