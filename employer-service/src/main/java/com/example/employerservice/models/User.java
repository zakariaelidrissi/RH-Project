package com.example.employerservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data @AllArgsConstructor @NoArgsConstructor
public class User {
    private Long idUser;
    private String nom;
    private String prenom;
    private String email;
    private String motDePasse;
    private String tel;
    @Enumerated(EnumType.STRING)
    private UserRole userRole;
}
