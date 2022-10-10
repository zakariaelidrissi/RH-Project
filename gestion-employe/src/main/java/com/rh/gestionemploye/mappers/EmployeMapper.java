package com.rh.gestionemploye.mappers;

import com.rh.gestionemploye.dto.EmployeRequest;
import com.rh.gestionemploye.dto.EmployeResponse;
import com.rh.gestionemploye.entities.Employe;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EmployeMapper {
    Employe requestToEmploye(EmployeRequest request);
    EmployeResponse employeToEmployeResponse(Employe customer);
}
