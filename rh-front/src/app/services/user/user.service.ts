import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  
  changeRole(id: number, role: string) : Observable<User> {
    return this.httpClient.post<User>("http://localhost:8087/changerole/"+id+"/"+role,{});
  }

  url: string = 'localhost:8081/users';
  // url: string = 'localhost:8888/USER-SERVICE/users';

  constructor(private httpClient: HttpClient) { }

  addUser(newUser: User): Observable<User> {
    console.log({newUser});
    
    return this.httpClient.post<User>("http://localhost:8087/adduser", newUser);
  }

  updateUser(updUser: User): Observable<User> {
    return this.httpClient.put<User>(this.url, updUser);
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(this.url + "/email/" + email);
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.url + "/" + id);
  }

  getById(id: number): Observable<User> {
    return this.httpClient.get<User>(this.url + "/" + id);
  }
}
