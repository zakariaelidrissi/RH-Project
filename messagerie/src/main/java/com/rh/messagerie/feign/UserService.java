package com.rh.messagerie.feign;

import com.rh.messagerie.entities.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "USER-SERVICE")
public interface UserService {
    @GetMapping(path = "/users/{userId}")
    User getUserById(@PathVariable Long userId);
    @GetMapping(path = "/users")
    List<User> getAllUsers();
}
