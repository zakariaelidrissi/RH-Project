package com.example.absenceservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class Stagiaire {
    private Long id;
    private String civilite;
    private String niveau_etudes;
    private String ville;
    private String telephone;
    private String cv;
    private String LinkedIn_URL;
    private Long userId;
    private User user;
}
