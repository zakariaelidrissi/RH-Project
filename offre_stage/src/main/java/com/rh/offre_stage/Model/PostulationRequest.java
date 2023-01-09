package com.rh.offre_stage.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
public class PostulationRequest {
    private Long userId;
    private Long OffreStageId;
}
