package com.RHmanagment.stagiaire.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
