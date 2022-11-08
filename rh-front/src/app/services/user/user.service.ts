import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  url : string = 'localhost:8081/users';

  constructor(private httpClient : HttpClient) { }

  addUser(newUser: User) : Observable<User> {
    return this.httpClient.post<User>(this.url, newUser);
  }

  updateUser(updUser : User) : Observable<User> {
    return this.httpClient.put<User>(this.url, updUser);
  }

  getUsers() : Observable<User[]> {
    return this.httpClient.get<User[]>(this.url);
  }

  getUserByEmail(email : string) : Observable<User> {
    return this.httpClient.get<User>(this.url + "/user/" + email);
  }

  deleteUser(id : number) : Observable<any> {
    return this.httpClient.delete<any>(this.url + "/" + id);
  }
}
