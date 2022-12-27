package com.rh.gestionemploye.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class User {
    private Long id;
    private String genre;
    private String nom;
    private String prenom;
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