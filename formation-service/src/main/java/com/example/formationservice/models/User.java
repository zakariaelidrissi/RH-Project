package com.example.formationservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
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
    //private boolean emailVerified;
    public enum UserRole {
        USER,
        ADMIN,
        EMPLOYER,
        STAGIAIRE,
        STAGIAIRE_POTENTIEL
    }
}