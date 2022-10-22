package com.RHmanagment.offre_stage.Entities;

import com.RHmanagment.offre_stage.Model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @ToString
public class StagesPostules {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long offreStageId;
    private Long userId;
    @Transient
    private User user;

}
