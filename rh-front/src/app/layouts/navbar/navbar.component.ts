import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
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

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.loginUser.nom = 'zaki';
    this.loginUser.prenom = 'ZR7';
  }

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }

  confirmationAdd(){
    if(this.newUser.motDePasse === this.confPass){
      this.addUser();
    }
  }

  addUser() {
    this.userService.addUser(this.newUser).subscribe((response) => {
      this.message = 'This Account added well been Successfuly!';
      $('#register').modal('hide');
    }, (error) => {
      console.log(error);
    });
  }

  login() {
    this.userService.getUserByEmail(this.loginEmail).subscribe((response) => {
      if (this.loginPass === response.motDePasse){
        this.loginUser = response;
        this.logged = true;
        localStorage.setItem('user', JSON.stringify({id: response.id, role: response.userRole, login: this.logged}));
        $('#login').modal('hide');
      }
      else {
        this.errors = "this email or password does not correct!";
      }
    }, (error) => {
      console.log(error);
    });
  }

}
