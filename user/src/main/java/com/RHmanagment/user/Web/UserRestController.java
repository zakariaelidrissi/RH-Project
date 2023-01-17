package com.RHmanagment.user.Web;

import com.RHmanagment.user.Entities.User;
import com.RHmanagment.user.Model.ChangePassword;
import com.RHmanagment.user.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController @AllArgsConstructor
@CrossOrigin("*")
public class UserRestController {
    private UserService userService;


    // ************************ GET **************************
    @GetMapping(path = "/users")
    public List<User> getAllUser() {
        return userService.getAllUsers();
    }

    @GetMapping(path = "/users/{id}")
    public User getUserById(@PathVariable Long id) {
        System.out.println("Id: " + id);
        return userService.getUserById(id);
    }

    // ************************ POST **************************
    @PostMapping(path = "/users")
    public User addUser(@RequestBody User UsrReq) {
        System.out.println("Adding User: " + UsrReq);
        return userService.addUser(UsrReq);
    }

    // ************************ PUT **************************
    @PutMapping(path = "/users")
    public User updateUser(@RequestBody User UsrReq) {
        return userService.updateUser(UsrReq);
    }

    @PutMapping(path = "/users/changePassword")
    public void changePassword(@RequestBody ChangePassword change) {
        userService.changePassword(change);
    }

    // ************************ DELETE **************************
    @DeleteMapping(path = "/users/{id}")
    public void deleteById(@PathVariable Long id) {
        userService.deleteById(id);
    }

}
