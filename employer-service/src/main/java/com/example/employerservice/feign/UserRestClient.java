package com.example.employerservice.feign;

import com.example.employerservice.confgSecFiegn.ClientConfiguration;
import com.example.employerservice.models.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

//@FeignClient(name = "USER-SERVICE", configuration = {ClientConfiguration.class})
public interface UserRestClient {

    //@GetMapping(path = "/users/{id}")
    User getUserById(@PathVariable Long id);
}
