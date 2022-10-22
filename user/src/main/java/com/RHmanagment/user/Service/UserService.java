package com.RHmanagment.user.Service;

import com.RHmanagment.user.Entities.User;
import com.RHmanagment.user.Feign.OffreStageRestClient;
import com.RHmanagment.user.Model.Compte;
import com.RHmanagment.user.Model.UserRequest;
import com.RHmanagment.user.Model.OffreStage;
import com.RHmanagment.user.Repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class UserService {

    private UserRepository userRepository;
    private OffreStageRestClient offrestageRestClient;

    // ************************ GET **************************
    public OffreStage getOffreStageById(Long id) {
        return offrestageRestClient.getOffreStageById(id);
    }

    /*public List<User> getAllUsers() {
        List<User> listUsr = userRepository.findAll();
        listUsr.forEach(Usr -> {
            Usr.setOffreStage(getOffreStageById(Usr.getOffreStage().getId()));
        });

        return listUsr;
    }

    public User getUserById(Long id){
        User Usr = userRepository.findUserById(id);
        Usr.setOffreStage(getOffreStageById(Usr.getOffreStage().getId()));

        return  Usr;
    }*/

   /* public OffreStage getOffreStageByUserId(Long id) {
        User Usr = userRepository.findUserById(id);
        Usr.setUser(getUserById(Usr.getUserId()));

        return Usr;
    }*/

    public User login(String email){
        return userRepository.findUserByEmail(email);
    }
    // ************************ POST **************************
    public void addUser(UserRequest UsrReq) {
        User Usr = new User();

        Usr.setGenre(UsrReq.getGenre());
        Usr.setPrenom(UsrReq.getPrenom());
        Usr.setNom(UsrReq.getNom());
        Usr.setEmail(UsrReq.getEmail());
        Usr.setMotDePasse(UsrReq.getMotDePasse());
        Usr.setTel(UsrReq.getTel());

        userRepository.save(Usr);
    }

    // ************************ PUT **************************
    public void updateUser(UserRequest UsrReq) {
        User Usr = getUseById(UsrReq.getIdUser());

        Usr.setGenre(UsrReq.getGenre());
        Usr.setPrenom(UsrReq.getPrenom());
        Usr.setNom(UsrReq.getNom());
        Usr.setEmail(UsrReq.getEmail());
        Usr.setMotDePasse(UsrReq.getMotDePasse());
        Usr.setTel(UsrReq.getTel());

        userRepository.save(Usr);
    }

    // ************************ DELETE **************************
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }
}

