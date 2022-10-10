package com.rh.gestionemploye.services;

import com.rh.gestionemploye.dto.EmployeRequest;
import com.rh.gestionemploye.dto.EmployeResponse;
import com.rh.gestionemploye.entities.Employe;
import com.rh.gestionemploye.mappers.EmployeMapper;
import com.rh.gestionemploye.repos.EmployeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
//@AllArgsConstructor
public class EmployeService {

    @Autowired private EmployeRepo repo;
    @Autowired private EmployeMapper mapper;

    public EmployeResponse save(EmployeRequest req) {
        Employe e = repo.save(mapper.requestToEmploye(req));
        creerCompte(e);
        return mapper.employeToEmployeResponse(e);
    }

    private void creerCompte(Employe e) {
        String login = e.getEmail();
        String password = e.getNom() + e.getCin();

        // TODO: call the accounts service to add employee
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
}
