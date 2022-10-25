package com.rh.offre_stage.Entities;

import javax.persistence.Transient;

public class OffresStagesByUser {
    private Long idUser;
    @Transient
    private OffreStage OffreStage;
}
