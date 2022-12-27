package com.RHmanagment.user.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor @ToString
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cin;
    private String genre;
    private String nom;
    private String prenom;
    private Date dateNaissance;
    @Column(unique = true)
    private String email;
    private String motDePasse;
    @Column(unique = true)
    private String tel;
    @Enumerated(EnumType.STRING)
    private UserRole userRole;


}
