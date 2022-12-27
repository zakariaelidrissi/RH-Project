package com.rh.offre_stage.Feign;

import com.rh.offre_stage.Model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "USER-SERVICE")
public interface UserClient {
    @GetMapping(path = "/users/{id}")
    User getUserById(@PathVariable Long id);
}

