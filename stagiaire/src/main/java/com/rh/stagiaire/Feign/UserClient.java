package com.rh.stagiaire.Feign;

import com.rh.stagiaire.Model.User;
import com.rh.stagiaire.confgSecFiegn.ClientConfiguration;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "USER-SERVICE", configuration = {ClientConfiguration.class})
public interface UserClient {

    @GetMapping(path = "/users/{id}")
    User getUserById(@PathVariable Long id);
}
