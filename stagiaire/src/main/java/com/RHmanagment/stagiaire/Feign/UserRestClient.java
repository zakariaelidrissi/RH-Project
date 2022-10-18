package com.RHmanagment.stagiaire.Feign;

import com.RHmanagment.stagiaire.Model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("USER-SERVICE")
public interface UserRestClient {

    @GetMapping(path = "users/{id}")
    User getUserById(@PathVariable Long id);
}
