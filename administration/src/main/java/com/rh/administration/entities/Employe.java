package com.rh.administration.entities;

import lombok.Data;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Data
public class Employe {
    Long id;
    Long userId;
    Date debutAmbauche;
    String departement;
    String poste;
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
