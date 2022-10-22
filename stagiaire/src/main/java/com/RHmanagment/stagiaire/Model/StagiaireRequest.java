package com.RHmanagment.stagiaire.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data @AllArgsConstructor @NoArgsConstructor @ToString
public class StagiaireRequest {

    private Long id;
    private String civilite;
    private String niveau_etudes;
    private String ville;
    private String telephone;
    private String cv;
    private String LinkedIn_URL;
    private Long userId;
}
