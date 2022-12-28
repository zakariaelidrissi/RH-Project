package com.rh.stagiaire.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data @AllArgsConstructor @NoArgsConstructor
public class User {
    private Long idUser;
    private String nom;
    private String prenom;
    private String email;
    private String motDePasse;
    private String tel;
    private String userRole;
}
