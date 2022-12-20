package com.rh.stagiaire.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class StagiareRequest {

    private Long id;
    private Long userId;
    private String civilite;
    private String niveau_etudes;
    private String ville;
    private String telephone;
    private String cv;
    private String LinkedIn_URL;
}
