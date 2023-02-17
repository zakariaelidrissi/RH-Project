package com.example.formationservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Data @AllArgsConstructor @NoArgsConstructor
public class Employe {
    Long id;
    Long userId;
    Date debutAmbauche;
    Departement departement;
    Poste poste;
    Etablissement etablissement;

    User user;

    public enum Etablissement{
        FS("FS"),
        ENSAM("ENSAM"),
        FLSH("FLSH"),
        FST("FST"),
        EST("EST"),
        ENS("ENS"),
        ENAM("ENAM"),
        ENCG("ENCG"),
        FSJES("FSJES");
        private final String name;
        private Etablissement(String name) {
            this.name = name;
        }
        public String getName() {
            return name;
        }
    }
    public enum Departement{
        Informatique("Informatique"),
        Mathématique("Mathématique"),
        Biologie("Biologie"),
        Chimie("Chimie"),
        Physique("Physique"),
        Géologie("Géologie"),
        ;
        private final String name;
        private Departement(String name) {
            this.name = name;
        }
        public String getName() {
            return name;
        }
    }
    public enum Poste{
        Doyen("Doyen"),
        ViceDoyen("Vice-Doyen"),
        SecrétaireGeneral("SecretaireGeneral"),
        TechnicienSpécialisé("TechnicienSpécialisé"),
        ;
        //Dev("dev");
        private final String name;
        private Poste(String name) {
            this.name = name;
        }
        public String getName() {
            return name;
        }
    }
}
