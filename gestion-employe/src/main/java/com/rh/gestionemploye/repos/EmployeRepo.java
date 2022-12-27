package com.rh.gestionemploye.repos;

import com.rh.gestionemploye.entities.Employe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeRepo extends JpaRepository<Employe,Long> {
    List<Employe> findAllByPoste(String value);
    //Employe findEmployeByCin(String cin);
    List<Employe> findAllByDepartement(String value);
    Employe findByUserId(Long value);
}
