package com.rh.stagiaire.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Postulation {
    private Long id;
    private Long userId;
    private Long OffreStageId;
    private String Statut;
}
