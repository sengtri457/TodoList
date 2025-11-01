import { Injectable } from "@angular/core";
import { environment } from "../enviroments/enviroment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserModels } from "../models/typeModels";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class Apiservices {
  private apiUrl = environment.apiBase;

  constructor(private http: HttpClient) {}

  getTodos(url: String): Observable<UserModels> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<UserModels>(this.apiUrl + url, { headers });
  }
  createTodo(url: string, todo: UserModels): Observable<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<UserModels>(this.apiUrl + url, todo, { headers });
  }
  logUser(todo: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, todo);
  }
  registerUser(todo: {
    email: string;
    password: string;
    username: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, todo);
  }
}
