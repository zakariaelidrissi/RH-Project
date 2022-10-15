package com.example.absenceservice.feign;

import com.example.absenceservice.model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

//@FeignClient(name = "USER-SERVICE")
public interface UserRestClient {

    @GetMapping(path = "/users/{id}")
    User getUserById(@PathVariable Long id);
}
