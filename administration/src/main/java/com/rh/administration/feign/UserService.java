package com.rh.administration.feign;

import com.rh.administration.entities.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("USER-SERVICE")
public interface UserService {
    @GetMapping("/users/{id}")
    User getById(@PathVariable(name="id") Long id);
}
