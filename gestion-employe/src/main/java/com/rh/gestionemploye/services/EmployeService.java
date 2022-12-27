package com.rh.gestionemploye.services;

import com.rh.gestionemploye.dto.EmployeRequest;
import com.rh.gestionemploye.dto.EmployeResponse;
import com.rh.gestionemploye.entities.Employe;
import com.rh.gestionemploye.entities.User;
import com.rh.gestionemploye.feign.UserService;
import com.rh.gestionemploye.mappers.EmployeMapper;
import com.rh.gestionemploye.repos.EmployeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
//@AllArgsConstructor
public class EmployeService {

    @Autowired private EmployeRepo repo;
    @Autowired private EmployeMapper mapper;
    @Autowired private UserService userService;

    public EmployeResponse save(EmployeRequest req) {
        User user = creerCompte(req);
        Employe em = new Employe(
                -1L,
                user.getId(),
                Date.from(Instant.now()),
                req.getDepartement(),
                req.getPoste()
        );
        Employe e = repo.save(em);
        return mapper.employeToEmployeResponse(e);
    }

    private User creerCompte(EmployeRequest e) {
        String login = e.getEmail();
        String password = e.getNom() + e.getCin();

        // TODO: call the accounts service to add employee
        User user = new User(
                -1L,
                e.getGenre(),
                e.getNom(),
                e.getPrenom(),
                e.getEmail(),
                password,
                e.getTel(),
                User.UserRole.EMPLOYER
        );
        return userService.creerCompte(user);
    }

    // TODO
    public List<EmployeResponse> getAll() {
        return mapEmployes(repo.findAll());
    }
    private List<EmployeResponse> mapEmployes(List<Employe> l){
        return l.stream().map(p->mapper.employeToEmployeResponse(p)).collect(Collectors.toList());
    }

    public void delete(Long req) {
        repo.deleteById(req);
    }

    public EmployeResponse getById(Long id) {
        // TODO
        return mapper.employeToEmployeResponse(repo.findById(id).get());
    }

    public List<EmployeResponse> getAllByDepartement(String value) {
        return mapEmployes(repo.findAllByDepartement(value));
    }

    public List<EmployeResponse> getAllByPoste(String value) {
        return mapEmployes(repo.findAllByPoste(value));
    }

    public Employe getEmployeByCin(String cin){
        return repo.findEmployeByCin(cin);
    }
}
