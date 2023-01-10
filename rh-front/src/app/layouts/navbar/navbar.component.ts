import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { KeycloakSecurityService } from 'src/app/services/keycloak-security/keycloak-security.service';
import { UserService } from 'src/app/services/user/user.service';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

declare const $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;
  newUser: User = new User();
  loginUser: User = new User();
  confPass: string = '';
  message: string = '';
  loginEmail: string = '';
  loginPass: string = '';
  errors: string = '';
  username: string = '';
  logged: boolean = false;
  profile: any;

  constructor(private router: Router, public kcService: KeycloakService, private userService: UserService) { }

  async ngOnInit() {

    console.log(await this.kcService.getUserRoles());
    console.log(this.kcService);
    this.kcService.loadUserProfile().then((pr) => {
      console.log({ pr });
      this.profile = pr;
      this.kcService.isLoggedIn().then(a => {
        this.logged = a;
        console.log(a);
        this.checkInDB();
      })
    });
  }
  checkInDB() {
    const userRequest = new User();
    const { firstName, lastName, email, attributes: { cin, dob, gender, telephone } } = this.profile;
    userRequest.prenom = firstName;
    userRequest.nom = lastName;
    userRequest.email = email;
    userRequest.cin = cin[0];
    userRequest.dateNaissance = dob[0];
    userRequest.genre = gender[0];
    userRequest.tel = telephone[0];
    // userRequest.userRole = this.profile.userRole;

    this.userService.addUser(userRequest);
  }
  register() {
    console.log("يضصيصضي");
    window.stop();
    this.kcService.register().then((v) => {
      console.log({ v });
      this.checkInDB();
    }, (err) => {
      console.error({ err })
    });
  }

  login() {
    this.kcService.login();
    this.router.navigate(['/dash']);
  }

  logOut() {
    this.kcService.logout();
    this.logged = false;
    this.router.navigate(['/home']);
  }

}
