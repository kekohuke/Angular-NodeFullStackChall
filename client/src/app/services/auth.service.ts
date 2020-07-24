import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

export interface Cat {
  name: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) {}
  getAllCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>(this.url+'cats')
  }

  checkEmail(email): Observable<any> {
    console.log(email)
    return this.http.post<any>(this.url+'check-email',{email})
  }

}
