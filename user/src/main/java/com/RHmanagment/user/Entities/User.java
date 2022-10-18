package com.RHmanagment.user.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor @ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUser;
    private String genre;
    private String nom;
    private String prenom;
    private String email;
    private String motDePasse;
    private String tel;
    @Enumerated(EnumType.STRING)
    private UserRole userRole;
}
