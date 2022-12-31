package com.rh.gestionemploye.feign;

import com.rh.gestionemploye.entities.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "USER-SERVICE")

public interface UserService {
    @PostMapping(path = "/users")
    User creerCompte(User req);
    @GetMapping(path = "/users/{userId}")
    User getUserById(@PathVariable Long userId);
}
