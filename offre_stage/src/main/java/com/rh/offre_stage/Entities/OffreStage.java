package com.rh.offre_stage.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.*;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @ToString
public class OffreStage{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String intitule;
    private String type_stage;
    private Integer duree_stage_mois;
    @Temporal(TemporalType.DATE)
    private Date date_debut_stage;
    private Boolean remuneration;
    private String diplome_demande;
    private String descriptif_mission;

}