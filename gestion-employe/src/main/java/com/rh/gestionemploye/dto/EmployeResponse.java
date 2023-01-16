package com.rh.gestionemploye.dto;

import com.rh.gestionemploye.entities.Employe;
import com.rh.gestionemploye.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@AllArgsConstructor
@Data
public class EmployeResponse {
    Long id;
    Long userId;
    Date debutAmbauche;
    String departement;
    Employe.Poste poste;
    Employe.Etablissement etablissement;
    String name;
    User user;
}
