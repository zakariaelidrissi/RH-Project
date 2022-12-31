package com.RHmanagment.user.Model;

import com.RHmanagment.user.Entities.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.Date;

@Data @AllArgsConstructor @NoArgsConstructor @ToString
public class UserRequest {

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
    private Boolean Enabled;
}