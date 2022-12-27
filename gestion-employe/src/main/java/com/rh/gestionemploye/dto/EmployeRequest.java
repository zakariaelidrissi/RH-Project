package com.rh.gestionemploye.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@AllArgsConstructor
@Data
public class EmployeRequest {
    Long id;
    String nom;
    String prenom;
    String cin;
    String email;
    String genre;
    Date naissance;
    String tel;
    Date debutAmbauche;
    String departement;
    String poste;

}
