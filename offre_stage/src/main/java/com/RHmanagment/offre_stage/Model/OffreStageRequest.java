package com.RHmanagment.offre_stage.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Data @AllArgsConstructor @NoArgsConstructor @ToString
public class OffreStageRequest {

    private Long id;
    private String intitule;
    private String type_stage;
    private Integer duree_stage_mois;
    private Date date_debut_stage;
    private Boolean remuneration;
    private String diplome_demande;
    private String descriptif_mission;
    private Long userId;
}
