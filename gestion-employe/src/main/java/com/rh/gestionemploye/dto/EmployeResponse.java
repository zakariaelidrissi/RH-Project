package com.rh.gestionemploye.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@AllArgsConstructor
@Data
public class EmployeResponse {
    Long id;
    String nom;
    String cin;
    String email;
    Date naissance;
    Date debutAmbauche;
    String departement;
    String poste;
}
