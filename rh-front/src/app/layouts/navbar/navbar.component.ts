import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { KeycloakSecurityService } from 'src/app/services/keycloak-security/keycloak-security.service';
import { UserService } from 'src/app/services/user/user.service';

declare const $ : any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;
  newUser : User = new User();
  loginUser : User = new User();
  confPass : string = '';
  message : string = '';
  loginEmail : string = '';
  loginPass : string = '';
  errors : string = '';
  logged : boolean = false;

  constructor(private router : Router, public kcService: KeycloakSecurityService) { }

  ngOnInit(): void {

  }
  
  register() {
    this.kcService.kc.register();
  }

  login() {
    this.kcService.kc.login();
    this.router.navigate(['/dash']);
  }

  logOut() {
    this.kcService.kc.logout();
    this.router.navigate(['/home']);
  }

}
