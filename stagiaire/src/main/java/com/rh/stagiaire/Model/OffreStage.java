package com.rh.stagiaire.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Data @NoArgsConstructor @AllArgsConstructor @ToString
public class OffreStage {
    private Long id;
    private String intitule;
    private String type_stage;
    private Integer duree_stage_mois;
    private Date date_debut_stage;
    private Boolean remuneration;
    private String diplome_demande;
    private String descriptif_mission;

}