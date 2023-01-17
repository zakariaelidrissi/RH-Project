package com.rh.offre_stage.Web;

import com.rh.offre_stage.Entities.OffreStage;
import com.rh.offre_stage.Entities.Postulation;
import com.rh.offre_stage.Feign.UserClient;
import com.rh.offre_stage.Model.OffreStageRequest;
import com.rh.offre_stage.Model.PostulationRequest;
import com.rh.offre_stage.Model.User;
import com.rh.offre_stage.Repositories.PostulationRepository;
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
    private UserClient userClient;
    PostulationRepository postulationRepository;

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
    @PutMapping(path = "/postulations")
    public void updatePostulation(@RequestBody PostulationRequest pReq) {

        offreStageService.updatePostulation(pReq);
        User u =  userClient.getUserById(pReq.getUserId());
        acceptOrRejectApplication(pReq.getStatut(),u.getEmail());
    }

    // TODO : ************************ E m a i l *************************
    @PostMapping("/acceptRejectMail")
    public void acceptOrRejectApplication(@RequestParam("statut") String status, @RequestParam("email") String email) {
        // Code pour enregistrer le statut de la demande de stage (Accepté ou Refusé) :
        // Récupération de la demande de stage correspondante à l'Email Id :
        User user = userClient.getUserByEmail(email);
        Postulation P = postulationRepository.findPostulationByUser(user);
        // Mise à jour de l'état de la demande de stage en fonction de la valeur de status
        if (status.equals("ACCEPTED")) {
            P.setStatut("ACCEPTED");
            // Envoi d'un mail d'acceptation pour un éventuel entretien
            sendAcceptanceMail(email);
        } else if (status.equals("REJECTED")) {
            P.setStatut("REJECTED");
            // Envoi d'un mail de rejet de la candidature
            sendRejectionMail(email);
        }
        // Enregistrement des mises à jour dans la base de données
        postulationRepository.save(P);

    }
    private void sendAcceptanceMail(String emailId) {
        try {
                MimeMessage message = javaMailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message);
                helper.setTo(emailId);
                helper.setSubject("Acceptation de votre demande de stage");
                helper.setText("Nous sommes heureux de vous informer que votre demande de stage a été acceptée. Nous vous invitons à prendre contact avec nous pour fixer un entretien.");
                javaMailSender.send(message);
            } catch (MessagingException e) {
                // Traitement des erreurs
        }
    }
    private void sendRejectionMail(String emailId) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);
            helper.setTo(emailId);
            helper.setSubject("Rejet de votre demande de stage");
            helper.setText("Nous sommes désolés de vous informer que votre demande de stage a été rejetée. Nous vous remercions de votre intérêt pour notre entreprise.");
            javaMailSender.send(message);
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

