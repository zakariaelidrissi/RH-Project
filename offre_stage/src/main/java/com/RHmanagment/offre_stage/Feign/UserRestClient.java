package com.RHmanagment.offre_stage.Feign;

import com.RHmanagment.offre_stage.Model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("USER-SERVICE")
public interface UserRestClient {

    @GetMapping(path = "users/{id}")
    User getUserById(@PathVariable Long id);
}
