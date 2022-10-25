package com.rhmanagment.user.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data @AllArgsConstructor @NoArgsConstructor @ToString
public class UserRequest {

    private Long idUser;
    private String genre;
    private String nom;
    private String prenom;
    private String email;
    private String motDePasse;
    private String tel;
    private String userRole;
}