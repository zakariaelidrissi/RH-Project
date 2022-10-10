import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employe } from 'src/app/models/employe';
import { GestionEmployeService } from 'src/app/services/gestion-employe/gestion-employe.service';

declare const $ : any;

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {

  employes : Employe[] = [];

  constructor(private empolyeeServise : GestionEmployeService, private router : Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      $('.absence').DataTable( {
        pagingType : 'simple_numbers',
        pageLength : 5,
        processing : true,
        lengthMenu : [5, 10, 25],
        order : [[1, 'desc']]
      });
    }, 1);
    this.getAllEmployee();
  }

  getAllEmployee(){
    this.empolyeeServise.getAllEmploye().subscribe((Response) => {
      this.employes = Response;
    }, (err) => {
      console.log(err);
    })
  }

}
