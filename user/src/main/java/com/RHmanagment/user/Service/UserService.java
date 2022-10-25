package com.rhmanagment.user.Service;

import com.rhmanagment.user.Entities.User;
import com.rhmanagment.user.Repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
        BCryptPasswordEncoder bcp = new BCryptPasswordEncoder();
        UsrReq.setMotDePasse(bcp.encode(UsrReq.getMotDePasse()));
        userRepository.save(UsrReq);
    }

    // ************************ PUT **************************
    public void updateUser(User UsrReq) {
        User Usr = getUserById(UsrReq.getId());
        BCryptPasswordEncoder bcp = new BCryptPasswordEncoder();
        UsrReq.setMotDePasse(bcp.encode(UsrReq.getMotDePasse()));
        userRepository.save(Usr);
    }

    // ************************ DELETE **************************
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }
}

