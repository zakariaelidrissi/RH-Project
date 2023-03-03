package com.rh.messagerie.feign;

import com.rh.messagerie.entities.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "USER-SERVICE")
public interface UserService {
    @GetMapping(path = "/users/{userId}")
    User getUserById(@PathVariable Long userId);
    @GetMapping(path = "/users")
    List<User> getAllUsers();

    @GetMapping(path = "/users/email/{email}")
    User getUserByEmail(@PathVariable String email);

    @PostMapping(path = "/users")
    User addUser(@RequestBody User usrReq);

    @PostMapping(path = "/changerole/{id}/{role}")
    User changeRole(@PathVariable Long id,@PathVariable  String role);
}
