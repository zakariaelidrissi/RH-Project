package com.rh.stagiaire.Model;

import com.rh.stagiaire.confgSecFiegn.ClientConfiguration;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@Data @AllArgsConstructor @NoArgsConstructor
public class User {
    private Long id;
    private String genre;
    private String nom;
    private String prenom;
    private String email;
    private String motDePasse;
    private String tel;
    private String userRole;
    private boolean emailVerified;
    private String verificationCode;
}
