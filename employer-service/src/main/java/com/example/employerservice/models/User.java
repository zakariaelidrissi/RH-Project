package com.example.employerservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data @AllArgsConstructor @NoArgsConstructor
public class User {
    private Long id;
    private String cin;
    private String genre;
    private String nom;
    private String prenom;
    private Date dateNaissance;
    private String email;
    private String motDePasse;
    private String tel;
    private UserRole userRole;
}
