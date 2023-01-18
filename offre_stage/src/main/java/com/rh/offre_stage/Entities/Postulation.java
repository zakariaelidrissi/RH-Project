package com.rh.offre_stage.Entities;
import com.rh.offre_stage.Model.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @ToString
public class Postulation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private Long OffreStageId;
    @Temporal(TemporalType.DATE)
    private Date postulationDate;
    private String Statut="Waiting";

    @Transient
    private User user;

    @Transient
    private OffreStage offreStage;
}
