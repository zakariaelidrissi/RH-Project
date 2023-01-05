package com.rh.offre_stage.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.Date;

@Data @NoArgsConstructor @AllArgsConstructor
public class OffreStageRequest {
    private Long id;
    private String intitule;
    private String type_stage;
    private Integer duree_stage_mois;
    private Date date_debut_stage;
    private Boolean remuneration;
    private String diplome_demande;
    private String descriptif_mission;

}