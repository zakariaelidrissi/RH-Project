import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { KeycloakSecurityService } from 'src/app/services/keycloak-security/keycloak-security.service';
import { UserService } from 'src/app/services/user/user.service';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { getCurrentUserByEmail } from 'src/app/utils';
import { MessagerieService } from 'src/app/services/messagerie/messagerie.service';

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

  constructor(private router: Router, public kcService: KeycloakService, private userService: UserService,private mService: MessagerieService) { }
  STAGIAIRE_POTENTIEL="STAGIAIRE_POTENTIEL";
  STAGIAIRE="STAGIAIRE";
  async ngOnInit() {

    console.log();
    console.log(this.kcService);
    this.kcService.loadUserProfile().then((pr) => {
      console.log({ pr });
      this.profile = pr;
      // this.kcService.role
      this.kcService.isLoggedIn().then(async(a )=> {
        const roles = await this.kcService.getUserRoles();
        this.logged = a;
        console.log(a);
        const user = await getCurrentUserByEmail(this.mService,pr.email as string);
        if(roles.includes("TO_INSERT")){
          if(!user) this.checkInDB();
        }else{
          console.log("No insert");
        }
        console.log({user});
        
        // if(!!user && user.userRole == this.STAGIAIRE_POTENTIEL && roles.includes(this.STAGIAIRE)){
        //   this.userService.changeRole(user.id,this.STAGIAIRE).toPromise()
        //   .then(_=>console.log("role changed"))
        //   .catch(console.error);
        // }
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
    userRequest.userRole = this.STAGIAIRE_POTENTIEL;
    // userRequest.userRole = this.profile.userRole;

    this.userService.addUser(userRequest).subscribe(user=>{
      console.log("user added",{user});      
    }, e => {
      console.error(e);
    });
    
  }
  register() {
    console.log("register");
    window.stop();
    this.kcService.register().then((v) => {
      console.log({ v });
      alert("register");
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
