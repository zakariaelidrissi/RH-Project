import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakSecurityService } from 'src/app/services/keycloak-security/keycloak-security.service';
declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public kcService: KeycloakSecurityService, private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      $('#example').DataTable( {
        pagingType : 'simple_numbers',
        pageLength : 5,
        processing : true,
        lengthMenu : [5, 10, 25],
        order : [[1, 'desc']]
      });
    }, 1);
  }  

  Settings() {
    this.kcService.kc.accountManagement();
  }

  logOut() {
    this.kcService.kc.logout();
    console.log('logOut...');
    this.router.navigate(['/home']);
  }

}
