package com.example.formationservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data @AllArgsConstructor @NoArgsConstructor
public class PlanRequest {
    private Long id;
    private String name;
    private Date planDate;
    private Long employe_id;
}
