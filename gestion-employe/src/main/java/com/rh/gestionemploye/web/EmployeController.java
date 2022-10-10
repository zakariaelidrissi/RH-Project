package com.rh.gestionemploye.web;


import com.rh.gestionemploye.dto.EmployeRequest;
import com.rh.gestionemploye.dto.EmployeResponse;
import com.rh.gestionemploye.services.EmployeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
public class EmployeController {
    EmployeService service;

    // ********************** POST ***************************************
    @PostMapping(path = "/employe")
    public EmployeResponse add(@RequestBody EmployeRequest req){
        return service.save(req);
    }

    // ********************** PUT ***************************************
    @PutMapping(path = "/employe")
    public EmployeResponse update(@RequestBody EmployeRequest req){
        return service.save(req);
    }

    // ********************** DELETE ***************************************
    @DeleteMapping(path = "/employe/{id}")
    public void delete(@PathVariable Long id){
        service.delete(id);
    }

    // ********************** GET ***************************************
    @GetMapping(path = "/employes/{id}")
    public EmployeResponse get(@PathVariable Long id){
        return service.getById(id);
    }

    @GetMapping(path = "/employes")
    public List<EmployeResponse> get(){
        return service.getAll();
    }

    @GetMapping(path = "/employes/{key}/{value}")
    public List<EmployeResponse> getByKey(@PathVariable String key,@PathVariable String value) throws Exception {
        switch (key){
            case "departement":
                return service.getAllByDepartement(value);
            case "poste":
                return service.getAllByPoste(value);
            default:
                throw new Exception("key: "+key+" invalid");
        }
    }
}
