package com.example.absenceservice.web;

import com.example.absenceservice.feign.UserRestClient;
import com.example.absenceservice.model.User;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
public class AbsenceController {

    private UserRestClient userRestClient;

    @GetMapping(path = "/getUser/{id}")
    User getUser(@PathVariable Long id){
        return userRestClient.getUserById(id);
    }
}
