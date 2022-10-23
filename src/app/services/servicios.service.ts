import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  public token: any;
  public headers: any;
  constructor(private http: HttpClient
    ) { }

  public getPromotions(): Observable<any> {
    return this.http.post<any>(`${environment.api}posts`, {}, { headers: this.setTokenHeader() });
  }

  public login(param: any): Observable<any> {
    return this.http.post<any>(`${environment.api}login`, param);

   // localStorage.setItem('currentUser', JSON.stringify(user));

  }

  public register(param: any): Observable<any> {
    return this.http.post<any>(`${environment.api}register`, param);

   // localStorage.setItem('currentUser', JSON.stringify(user));

  }

  public save(param: any): Observable<any> {
    return this.http.post<any>(`${environment.api}save`, param);

   // localStorage.setItem('currentUser', JSON.stringify(user));

  }




  setTokenHeader() {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", this.getTokenLocalStorage());
    return headers
  }
  
  getTokenLocalStorage() {
    let token = localStorage.getItem("token");
    if (token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }
    return 'Bearer '+this.token
  }
}
