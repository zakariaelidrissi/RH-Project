package com.rh.stagiaire.Feign;

import com.rh.stagiaire.Model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "USER-SERVICE")
public interface UserClient {
    @GetMapping(path = "/users/{id}")
    User getUserById(@PathVariable Long id);
}

