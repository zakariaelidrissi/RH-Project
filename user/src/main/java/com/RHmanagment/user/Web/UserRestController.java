package com.RHmanagment.user.Web;

import com.RHmanagment.user.Entities.User;
import com.RHmanagment.user.Service.UserService;
import com.rhmanagment.user.Model.ChangePassword;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
    public User getUserById(@PathVariable Long id){
        return userService.getUserById(id);
    }

    /*@GetMapping(path = "/users/user/{id}")
    public User getUserByUserId(@PathVariable Long id) {
        return userService.getUserById(id);
    }*/

    @GetMapping(path = "/users/user/{email}")
    public User getUserByEmail(@PathVariable String email){
        return userService.login(email);
    }

    // ************************ POST **************************
    @PostMapping(path = "/users")
    public void addUser(@RequestBody User UsrReq) {
        userService.addUser(UsrReq);
    }

    // ************************ PUT **************************
    @PutMapping(path = "/users")
    public void updateUser(@RequestBody User UsrReq) {
        userService.updateUser(UsrReq);
    }

    @PutMapping(path = "/users/changePassword")
    public void changePassword(@RequestBody ChangePassword change){
        userService.changePassword(change);
    }

    // ************************ DELETE **************************
    @DeleteMapping(path = "/users/{id}")
    public void deleteById(@PathVariable Long id) {
        userService.deleteById(id);
    }
}

