package com.RHmanagment.user.Service;

import com.RHmanagment.user.Entities.User;
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

    // ************************ GET **************************
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id){
        return userRepository.findUserById(id);
    }

    public User login(String email){
        return userRepository.findUserByEmail(email);
    }
    // ************************ POST **************************
    public void addUser(User UsrReq) {

        userRepository.save(UsrReq);
    }

    // ************************ PUT **************************
    public void updateUser(User UsrReq) {
        User Usr = getUserById(UsrReq.getId());

        userRepository.save(Usr);
    }

    // ************************ DELETE **************************
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }
}

